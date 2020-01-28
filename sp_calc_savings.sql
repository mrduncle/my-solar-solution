CREATE DEFINER=`root`@`localhost` PROCEDURE `calc_savings`(
	IN locn VARCHAR(45)
    ,IN solarea DECIMAL(3,1)
    ,OUT dolls_yr DECIMAL(6,2)
)
BEGIN
    
    SET @locin = (SELECT
				      id
				  FROM tbllocations
                  WHERE location = locn);
	
    SET dolls_yr = (SELECT
					    SUM(radiation) * 0.18 * solarea / 1000 * 0.24
	  				FROM tblradiations
	  				WHERE tbllocationId = @locin);
                    
	SELECT @dolls_yr;
END