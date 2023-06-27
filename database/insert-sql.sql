-- REFERENCE for inserting data into all tables of the database. 
USE cows_db;

-- Insert new cow with required info. 
INSERT INTO cow (cow_tag_current, birth_year, color)
VALUES ("A1", "2018", "red");

-- Insert new calf with required info plus mother's id. 
INSERT INTO calf (calf_tag_current, color, birth_date, mother_cow_id) 
VALUES ("A1", "black", "2023-01-30", (SELECT cow_id FROM cow WHERE cow_id = 1));

-- Insert new bull with required info. 
INSERT INTO bull (bull_tag_current, birth_year, color, breed) 
VALUES ("104", "2022", "black", "5/8 Sim/Angus");

-- 