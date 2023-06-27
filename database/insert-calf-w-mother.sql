USE cows_db;

SELECT * from calf;
SELECT * from cow;

-- Insert new cow. 
INSERT INTO cow (cow_tag_current, birth_year, color)
VALUES ("A1", "2018", "red");

-- Insert new calf with its mother's id. 
INSERT INTO calf (calf_tag_current, color, birth_date, mother_cow_id) 
VALUES ("A1", "black", "2023-01-30", (SELECT cow_id FROM cow WHERE cow_id = 1));
