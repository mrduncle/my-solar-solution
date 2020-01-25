USE project2;

CREATE TABLE `importtable2` (
  `dateandtime` datetime NOT NULL,
  `locationid` int(11) NOT NULL,
  `location` varchar(45) NOT NULL,
  `radiation` int(11) NOT NULL,
  KEY `idx_locndt` (`locationid`,`dateandtime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/solarData.csv'
INTO TABLE importtable
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

