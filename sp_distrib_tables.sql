DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `distrib_tables`()
BEGIN

	-- if the index has not been implemented before for the table, this will fail the procedure 
    -- so the procedure will need to be altered and the below two lines commented out
	ALTER TABLE importtable
    DROP INDEX idx_locndt;
	
    -- create index for importtable to significantly speed up queries below
	CREATE INDEX idx_locndt
	ON importtable (locationid, dateandtime);

	-- load data from the import table into the location table
	INSERT INTO tbllocations (id, location)
	SELECT DISTINCT
		locationid
		,location
	FROM importtable;
	
    ALTER TABLE tbldatetimes auto_increment = 1;
    
    
	-- load data from the import table into the datetime table
	INSERT INTO tbldatetimes (datetimecol)
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
		FROM tbllocations AS S1
		INNER JOIN importtable
		ON S1.id = locationid
	);
	
    -- if the index has not been implemented before for the table, this will fail the procedure 
    -- so the procedure will need to be altered and the below two lines commented out
	ALTER TABLE temp_table
	DROP INDEX idx_ttlocndt;
	
    -- create index for temp_table to significantly speed up queries below
	CREATE INDEX idx_ttlocndt
	ON temp_table (locnid, dateandtime);

	-- update temp_table with the radiation
	UPDATE temp_table AS S1
	INNER JOIN importtable AS S2
	ON S2.locationid = S1.locnid
	AND S2.dateandtime = S1.dateandtime
	SET S1.radiation = S2.radiation;
    
    -- if the index has not been implemented before for the table, this will fail the procedure 
    -- so the procedure will need to be altered and the below two lines commented out
    ALTER TABLE tbldatetimes
	DROP INDEX idx_dt;
    
    -- create index for tbldatetimes to significantly speed up query below
    CREATE INDEX idx_dt
    ON tbldatetimes(datetimecol);
    
    UPDATE temp_table AS S1
    INNER JOIN tbldatetimes AS S2
    ON S1.dateandtime = S2.datetimecol
    SET S1.dateid = S2.id;

	INSERT INTO tblradiations (tbllocationId, tbldatetimeId, radiation)
	SELECT
		locnid
		,dateid
		,radiation
	FROM temp_table;
END$$
DELIMITER ;
