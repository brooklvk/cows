-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cows_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cows_db` ;

-- -----------------------------------------------------
-- Schema cows_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cows_db` DEFAULT CHARACTER SET utf8 ;
USE `cows_db` ;

-- -----------------------------------------------------
-- Table `cows_db`.`death`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`death` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`death` (
  `death_id` INT NOT NULL AUTO_INCREMENT,
  `if_died` TINYINT NOT NULL,
  `death_date` DATE NOT NULL,
  `death_notes` VARCHAR(150) NULL,
  PRIMARY KEY (`death_id`),
  UNIQUE INDEX `death_id_UNIQUE` (`death_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`sale`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`sale` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`sale` (
  `sale_id` INT NOT NULL AUTO_INCREMENT,
  `if_sold` TINYINT NOT NULL,
  `sale_date` DATE NOT NULL,
  `sale_notes` VARCHAR(150) NULL,
  PRIMARY KEY (`sale_id`),
  UNIQUE INDEX `sale_id_UNIQUE` (`sale_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`cow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`cow` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`cow` (
  `cow_id` INT NOT NULL AUTO_INCREMENT,
  `cow_tag_current` VARCHAR(10) NOT NULL,
  `birth_year` YEAR NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `phys_description` VARCHAR(45) NULL,
  `breed` VARCHAR(45) NULL,
  `notes` VARCHAR(150) NULL,
  `bulling` VARCHAR(150) NULL,
  `death_id` INT NULL,
  `sale_id` INT NULL,
  `branding_date` DATE NULL,
  `mother_cow_id` INT NULL,
  PRIMARY KEY (`cow_id`),
  INDEX `fk_cow_death1_idx` (`death_id` ASC) VISIBLE,
  INDEX `fk_cow_sale1_idx` (`sale_id` ASC) VISIBLE,
  UNIQUE INDEX `cow_id_UNIQUE` (`cow_id` ASC) VISIBLE,
  INDEX `fk_cow_cow1_idx` (`mother_cow_id` ASC) VISIBLE,
  CONSTRAINT `fk_cow_death1`
    FOREIGN KEY (`death_id`)
    REFERENCES `cows_db`.`death` (`death_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cow_sale1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `cows_db`.`sale` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cow_cow1`
    FOREIGN KEY (`mother_cow_id`)
    REFERENCES `cows_db`.`cow` (`cow_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`calf`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`calf` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`calf` (
  `calf_id` INT NOT NULL AUTO_INCREMENT,
  `calf_tag_current` VARCHAR(10) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `phys_description` VARCHAR(45) NULL,
  `birth_date` DATE NOT NULL,
  `birth_location` VARCHAR(90) NULL,
  `breed` VARCHAR(45) NULL,
  `notes` VARCHAR(150) NULL,
  `death_id` INT NULL,
  `sale_id` INT NULL,
  `branding_date` DATE NULL,
  `gender` ENUM('h', 'b') NULL,
  `mother_cow_id` INT NULL,
  PRIMARY KEY (`calf_id`),
  INDEX `fk_calf_death1_idx` (`death_id` ASC) VISIBLE,
  INDEX `fk_calf_sale1_idx` (`sale_id` ASC) VISIBLE,
  UNIQUE INDEX `calf_id_UNIQUE` (`calf_id` ASC) VISIBLE,
  INDEX `fk_calf_cow1_idx` (`mother_cow_id` ASC) VISIBLE,
  CONSTRAINT `fk_calf_death1`
    FOREIGN KEY (`death_id`)
    REFERENCES `cows_db`.`death` (`death_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calf_sale1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `cows_db`.`sale` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calf_cow1`
    FOREIGN KEY (`mother_cow_id`)
    REFERENCES `cows_db`.`cow` (`cow_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`bull`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`bull` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`bull` (
  `bull_id` INT NOT NULL AUTO_INCREMENT,
  `bull_tag_current` VARCHAR(10) NOT NULL,
  `purchase_from` VARCHAR(45) NULL,
  `purchase_date` DATE NULL,
  `birth_year` YEAR NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `phys_description` VARCHAR(45) NULL,
  `breed` VARCHAR(45) NOT NULL,
  `notes` VARCHAR(150) NULL,
  `death_id` INT NULL,
  `sale_id` INT NULL,
  `branding_date` DATE NULL,
  `mother_cow_id` INT NULL,
  PRIMARY KEY (`bull_id`),
  INDEX `fk_bull_death1_idx` (`death_id` ASC) VISIBLE,
  INDEX `fk_bull_sale1_idx` (`sale_id` ASC) VISIBLE,
  UNIQUE INDEX `bull_id_UNIQUE` (`bull_id` ASC) VISIBLE,
  INDEX `fk_bull_cow1_idx` (`mother_cow_id` ASC) VISIBLE,
  CONSTRAINT `fk_bull_death1`
    FOREIGN KEY (`death_id`)
    REFERENCES `cows_db`.`death` (`death_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bull_sale1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `cows_db`.`sale` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bull_cow1`
    FOREIGN KEY (`mother_cow_id`)
    REFERENCES `cows_db`.`cow` (`cow_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`shots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`shots` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`shots` (
  `shot_id` INT NOT NULL AUTO_INCREMENT,
  `shot_name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`shot_id`),
  UNIQUE INDEX `shot_id_UNIQUE` (`shot_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`calf_has_shots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`calf_has_shots` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`calf_has_shots` (
  `calf_id` INT NOT NULL,
  `shot_id` INT NOT NULL,
  `shot_date` DATE NOT NULL,
  `shot_dose` VARCHAR(45) NULL,
  PRIMARY KEY (`calf_id`, `shot_id`),
  INDEX `fk_calf_has_shots_shots1_idx` (`shot_id` ASC) VISIBLE,
  INDEX `fk_calf_has_shots_calf1_idx` (`calf_id` ASC) VISIBLE,
  CONSTRAINT `fk_calf_has_shots_calf1`
    FOREIGN KEY (`calf_id`)
    REFERENCES `cows_db`.`calf` (`calf_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calf_has_shots_shots1`
    FOREIGN KEY (`shot_id`)
    REFERENCES `cows_db`.`shots` (`shot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`cow_has_shots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`cow_has_shots` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`cow_has_shots` (
  `cow_id` INT NOT NULL,
  `shot_id` INT NOT NULL,
  `shot_date` DATE NOT NULL,
  PRIMARY KEY (`cow_id`, `shot_id`),
  INDEX `fk_cow_has_shots_shots1_idx` (`shot_id` ASC) VISIBLE,
  INDEX `fk_cow_has_shots_cow1_idx` (`cow_id` ASC) VISIBLE,
  CONSTRAINT `fk_cow_has_shots_cow1`
    FOREIGN KEY (`cow_id`)
    REFERENCES `cows_db`.`cow` (`cow_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cow_has_shots_shots1`
    FOREIGN KEY (`shot_id`)
    REFERENCES `cows_db`.`shots` (`shot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cows_db`.`vet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cows_db`.`vet` ;

CREATE TABLE IF NOT EXISTS `cows_db`.`vet` (
  `vet_id` INT NOT NULL AUTO_INCREMENT,
  `vet_name` VARCHAR(45) NOT NULL,
  `visit_date` DATE NOT NULL,
  `reason` VARCHAR(150) NOT NULL,
  `after_visit` VARCHAR(150) NOT NULL,
  `calf_id` INT NULL,
  `cow_id` INT NULL,
  `bull_id` INT NULL,
  PRIMARY KEY (`vet_id`),
  UNIQUE INDEX `vet_id_UNIQUE` (`vet_id` ASC) VISIBLE,
  INDEX `fk_vet_calf1_idx` (`calf_id` ASC) VISIBLE,
  INDEX `fk_vet_cow1_idx` (`cow_id` ASC) VISIBLE,
  INDEX `fk_vet_bull1_idx` (`bull_id` ASC) VISIBLE,
  CONSTRAINT `fk_vet_calf1`
    FOREIGN KEY (`calf_id`)
    REFERENCES `cows_db`.`calf` (`calf_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vet_cow1`
    FOREIGN KEY (`cow_id`)
    REFERENCES `cows_db`.`cow` (`cow_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vet_bull1`
    FOREIGN KEY (`bull_id`)
    REFERENCES `cows_db`.`bull` (`bull_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
