USE cows_db;

-- Edit model queries. Remember to edit model to match. 

-- Make gender able to be null 
ALTER table calf
MODIFY gender enum('h','b') NULL;

-- delete mother cow id from calf 
ALTER table calf
DROP mother_cow_id;

-- change mother cow id in cow to int 
ALTER table cow
MODIFY mother_cow_id INT;

-- NEED TO UPDATE/REENGINEER DB 
-- added one to many relationship cow -> calf with key cow_id = mother_cow_id 
-- added one to many relationship cow -> cow with key cow_id = mother_cow_id 

