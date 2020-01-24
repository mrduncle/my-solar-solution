DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `distrib_tables`()
BEGIN
	ALTER TABLE importtable
	DROP INDEX idx_locndt;

	CREATE INDEX idx_locndt
	ON importtable (locationid, dateandtime);

	-- load data from the import table into the location table
	INSERT INTO location (id, location)
	SELECT DISTINCT
		locationid
		,location
	FROM importtable;

	-- load data from the import table into the datetime table
	INSERT INTO datetime (datetimecol)
	SELECT DISTINCT
		dateandtime
	FROM importtable;

	-- create a temporary table and populate with location table info plus dateandtime
	-- from the import table
	CREATE TEMPORARY TABLE IF NOT EXISTS temp_table AS 
	(
		SELECT
			S1.id AS locnid
			,S1.location
			,0 AS dateid
			,dateandtime
			,0 AS radiation
		FROM location AS S1
		INNER JOIN importtable
		ON S1.id = locationid
	);

	ALTER TABLE temp_table
	DROP INDEX idx_ttlocndt;

	CREATE INDEX idx_ttlocndt
	ON temp_table (locnid, dateandtime);

	-- update temp_table with the radiation
	UPDATE temp_table AS S1
	INNER JOIN importtable AS S2
	ON S2.locationid = S1.locnid
	AND S2.dateandtime = S1.dateandtime
	SET S1.radiation = S2.radiation;

	INSERT INTO tblradiation (locationid, datetimeid, radiation)
	SELECT
		locnid
		,dateid
		,radiation
	FROM temp_table;
    
END$$
DELIMITER ;
