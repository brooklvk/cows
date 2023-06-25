USE cows_db;

SELECT * from calf;
SELECT * from cow;

DELETE from calf
WHERE calf_id = 1;

INSERT INTO cow (cow_tag_current, birth_year, color)
VALUES ("A1", "2018", "red");

INSERT INTO calf (calf_tag_current, color, birth_date, mother_cow_id) 
VALUES ("A1", "black", "2023-01-30", (SELECT cow_id FROM cow WHERE cow_id = 1));

-- eeeeeeeeeeeeeeeeyayyyyyyyyayayayayayayyayayayayyyayyyyyayayyayyayyyayayyyyyy
