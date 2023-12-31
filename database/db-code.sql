-- Database: cows

-- SQL FOR CREATING ENTIRE DATABASE 

-- DROP DATABASE IF EXISTS cows;

CREATE DATABASE cows
    WITH
    OWNER = cows
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF8'
    LC_CTYPE = 'en_US.UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DATABASE cows
    SET "TimeZone" TO 'utc';

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TABLES TO cows;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON SEQUENCES TO cows;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT EXECUTE ON FUNCTIONS TO cows;




-- SQL FOR CREATING TABLES, in abc order 

-- Table structure for table 'account'
-- DROP TABLE IF EXISTS public.account;
CREATE TABLE IF NOT EXISTS public.account 
(
	account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY, 
	account_firstname character varying NOT NULL, 
	account_lastname character varying NOT NULL, 
	account_email character varying NOT NULL, 
	account_password character varying NOT NULL, 
	CONSTRAINT account_pk PRIMARY KEY (account_id)
);

-- Table: public.bull

DROP TABLE IF EXISTS public.bull CASCADE;
CREATE TABLE IF NOT EXISTS public.bull
(
    bull_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    bull_tag_current character varying COLLATE pg_catalog."default" NOT NULL,
    purchase_from character varying COLLATE pg_catalog."default",
    purchase_date date,
    birth_year character(4) COLLATE pg_catalog."default" NOT NULL,
    color character varying COLLATE pg_catalog."default" NOT NULL,
    phys_description text COLLATE pg_catalog."default",
    breed character varying COLLATE pg_catalog."default" NOT NULL,
    notes text COLLATE pg_catalog."default",
    branding_date date,
    mother_cow_id integer,
    CONSTRAINT bull_pkey PRIMARY KEY (bull_id),
    CONSTRAINT mother_cow_id FOREIGN KEY (mother_cow_id)
        REFERENCES public.cow (cow_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bull
    OWNER to cows;

-- Table: public.calf

DROP TABLE IF EXISTS public.calf CASCADE;
CREATE TABLE IF NOT EXISTS public.calf
(
    calf_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    calf_tag_current character varying COLLATE pg_catalog."default" NOT NULL,
    color character varying COLLATE pg_catalog."default" NOT NULL,
    phys_description character varying COLLATE pg_catalog."default",
    birth_date date NOT NULL,
    birth_location character varying COLLATE pg_catalog."default",
    breed character varying COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    branding_date date,
    gender gender,
    mother_cow_id integer,
    CONSTRAINT calf_pkey PRIMARY KEY (calf_id),
    CONSTRAINT mother_cow_id FOREIGN KEY (mother_cow_id)
        REFERENCES public.cow (cow_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.calf
    OWNER to cows;


-- Table: public.calf_has_shots

DROP TABLE IF EXISTS public.calf_has_shots CASCADE;
CREATE TABLE IF NOT EXISTS public.calf_has_shots
(
    calf_id integer NOT NULL,
    shot_id integer NOT NULL,
    shot_date date NOT NULL,
    shot_dose character varying COLLATE pg_catalog."default",
    CONSTRAINT calf_id FOREIGN KEY (calf_id)
        REFERENCES public.calf (calf_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT shot_id FOREIGN KEY (shot_id)
        REFERENCES public.shots (shot_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.calf_has_shots
    OWNER to cows;

-- Table: public.cow

DROP TABLE IF EXISTS public.cow CASCADE;
CREATE TABLE IF NOT EXISTS public.cow
(
    cow_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    cow_tag_current character varying COLLATE pg_catalog."default" NOT NULL,
    birth_year character(4) COLLATE pg_catalog."default" NOT NULL,
    color character varying COLLATE pg_catalog."default" NOT NULL,
    phys_description text COLLATE pg_catalog."default",
    breed character varying COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    branding_date date,
    mother_cow_id integer,
    CONSTRAINT cow_pkey PRIMARY KEY (cow_id),
    CONSTRAINT cow_was_calf FOREIGN KEY (cow_was_calf)
        REFERENCES public.calf (calf_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT mother_cow_id FOREIGN KEY (mother_cow_id)
        REFERENCES public.cow (cow_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cow
    OWNER to cows;


-- Table: public.cow_has_shots

DROP TABLE IF EXISTS public.cow_has_shots CASCADE;
CREATE TABLE IF NOT EXISTS public.cow_has_shots
(
    cow_id integer NOT NULL,
    shot_id integer NOT NULL,
    shot_date date NOT NULL,
    shot_dose character varying COLLATE pg_catalog."default",
    CONSTRAINT cow_id FOREIGN KEY (cow_id)
        REFERENCES public.cow (cow_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT shot_id FOREIGN KEY (shot_id)
        REFERENCES public.shots (shot_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cow_has_shots
    OWNER to cows;


-- Table: public.death

DROP TABLE IF EXISTS public.death CASCADE;
CREATE TABLE IF NOT EXISTS public.death
(
    death_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    if_died boolean NOT NULL,
    death_date date NOT NULL,
    death_notes character varying COLLATE pg_catalog."default",
    CONSTRAINT death_pkey PRIMARY KEY (death_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.death
    OWNER to cows;


-- Table: public.sale

DROP TABLE IF EXISTS public.sale CASCADE;
CREATE TABLE IF NOT EXISTS public.sale
(
    sale_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    if_sold boolean NOT NULL,
    sale_date date NOT NULL,
    sale_notes character varying COLLATE pg_catalog."default",
    CONSTRAINT sale_pkey PRIMARY KEY (sale_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sale
    OWNER to cows;

-- Table: public.session have no idea how this got here 

DROP TABLE IF EXISTS public.session;
CREATE TABLE IF NOT EXISTS public.session
(
    sid character varying COLLATE pg_catalog."default" NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.session
    OWNER to cows;
-- Index: IDX_session_expire

DROP INDEX IF EXISTS public."IDX_session_expire";
CREATE INDEX IF NOT EXISTS "IDX_session_expire"
    ON public.session USING btree
    (expire ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.shots

DROP TABLE IF EXISTS public.shots CASCADE;
CREATE TABLE IF NOT EXISTS public.shots
(
    shot_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    shot_name character varying COLLATE pg_catalog."default" NOT NULL,
    regular_dose character varying COLLATE pg_catalog."default",
    CONSTRAINT shots_pkey PRIMARY KEY (shot_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.shots
    OWNER to cows;


-- Table: public.vet

DROP TABLE IF EXISTS public.vet CASCADE;
CREATE TABLE IF NOT EXISTS public.vet
(
    vet_id INT GENERATED BY DEFAULT AS IDENTITY,
    vet_name character varying COLLATE pg_catalog."default" NOT NULL,
    visit_date date NOT NULL,
    reason character varying COLLATE pg_catalog."default" NOT NULL,
    after_visit character varying COLLATE pg_catalog."default",
    calf_id integer,
    cow_id integer,
    bull_id integer,
    CONSTRAINT vet_pkey PRIMARY KEY (vet_id),
    CONSTRAINT bull_id FOREIGN KEY (bull_id)
        REFERENCES public.bull (bull_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT calf_id FOREIGN KEY (calf_id)
        REFERENCES public.calf (calf_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT cow_id FOREIGN KEY (cow_id)
        REFERENCES public.cow (cow_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.vet
    OWNER to cows;



-- INSERT INTO ALL TABLES EXAMPLES 
-- put in cowsModel 


-- INSERT INTO cow(
-- 	cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf)
-- 	VALUES (DEFAULT, 'A1', '2023', 'red', 'red white face', 'hereford', 'a very good cow', '2023-07-31', null, null);
