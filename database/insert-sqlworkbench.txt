-- REFERENCE for inserting data into all tables of the database. 
USE cows_db;

-- Insert new cow with required info. 
INSERT INTO cow (cow_tag_current, birth_year, color)
VALUES ('A1', '2018', 'red');

-- Insert new calf with required info plus mother's id. 
INSERT INTO calf (calf_tag_current, color, birth_date, mother_cow_id) 
VALUES ('A1', 'black', '2023-01-30', (SELECT cow_id FROM cow WHERE cow_id = 1));

-- Insert new bull with required info. 
INSERT INTO bull (bull_tag_current, birth_year, color, breed) 
VALUES ('104', '2022', 'black', '5/8 Sim/Angus');

-- Insert death information into table (all columns). 
INSERT INTO death (if_died, death_date, death_notes) 
VALUES ('1', '2023-07-31', 'was sick etc then died');

-- Insert sale information into table (all columns).
INSERT INTO sale (if_sold, sale_date, sale_notes) 
VALUES ('1', '2023-07-31', 'cow was too skinny, sold for $350');

-- Insert vet visit information into table (all columns). 
INSERT INTO vet (vet_name, visit_date, reason, after_visit, cow_id) -- calf id and bull id also there, all 3 optional 
VALUES ('Sowards', '2023-07-31', 'is sick', '', (SELECT cow_id FROM cow WHERE cow_id = 1));

-- Insert shots information into table (all columns). 
INSERT INTO shots (shot_name, regular_dose) 
VALUES ('common cold', '1.3ml');

-- Insert into cow-has-shots 
-- same process for calf_has_shots 
INSERT INTO cow_has_shots (cow_id, shot_id, shot_date, shot_dose) 
VALUES ((SELECT cow_id FROM cow WHERE cow_id = 1), (SELECT shot_id FROM shots WHERE shot_name = 'common cold'), '2023-07-31', '1.3ml');

-- IDEA to improve: make default for shot_dose in cow_has_shots the regular dose at shot_id given 



