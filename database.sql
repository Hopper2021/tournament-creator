-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "persona" VARCHAR (80)
);

CREATE TABLE "kingdom" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80)
);

CREATE TABLE "park" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80)
);

CREATE TABLE "tournament" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE NOT NULL,
	"kingdom_id" integer REFERENCES "kingdom" NOT NULL,
	"park_id" integer REFERENCES "park",
	"user_id" integer REFERENCES "user",
	"type_id" integer REFERENCES "tournament_type" NOT NULL
);

CREATE TABLE "tournament_type" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200)
);

CREATE TABLE "entrant" (
	"id" SERIAL PRIMARY KEY,
	"persona" VARCHAR (200) NOT NULL,
	"kingdom_id" integer REFERENCES "kingdom" NOT NULL,
	"park_id" integer REFERENCES "park",
	"warriors" integer -- Warriors level cannot be higher than 10.
);

CREATE TABLE "tournament_entrant" (
	"id" SERIAL PRIMARY KEY,
	"tournament_id" integer REFERENCES "tournament",
	"entrant_id" integer REFERENCES "entrant",
	"score" integer -- Score rarely ever gets higher than 30 points.
);

INSERT INTO "kingdom" ("name")
VALUES ('Desert Winds'),
('Celestial Kingdom'),
('RiverMoor'),
('Iron Mountains'),
('Freehold'),
('Black Spire'),
('Burning Lands'),
('Crystal Groves'),
('DragonSpine'),
('Goldenvale'),
('Neverwinter'),
('Northern Lights'),
('Northreach'),
('Polaris'),
('Tal Dagore'),
('Emerald Hills'),
('Golden Plains'),
('Nine Blades'),
('Rising Winds'),
('Wetlands'),
('Viridian Outlands'),
('Westmarch'),
('Winters Edge')