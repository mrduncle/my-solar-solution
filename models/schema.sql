DROP DATABASE IF EXISTS project2;
CREATE DATABASE project2;

use project2;

CREATE TABLE `project2_schema`.`location`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR
(50) NOT NULL,
  `tme` TIME NOT NULL,
  `GHIR` DECIMAL
(6,2) NOT NULL,
  PRIMARY KEY
(`id`));

CREATE TABLE `project2_schema`.`solar`
(
`id` INT NOT NULL,
`brand` VARCHAR
(100) NOT NULL,
`output` INT NOT NULL,
`cost` DECIMAL
(6,2) NOT NULL,
`life` INT NOT NULL,
PRIMARY KEY
(`id`));
