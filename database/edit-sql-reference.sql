USE cows_db;

-- Edit model queries FOR REFERENCE ONLY-don't use 

-- Make gender able to be null 
ALTER table calf
MODIFY gender enum('h','b') NULL;

-- delete mother cow id from calf 
ALTER table calf
DROP mother_cow_id;

-- change mother cow id in cow to int 
ALTER table cow
MODIFY mother_cow_id INT;
