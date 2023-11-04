/*
  Evolutility
  SQL Script to create Evolutility demo DB on PostgreSQL.
  https://github.com/evoluteur/evolutility-models
  Fri Nov 03 2023 21:48:22 GMT-0700 (Pacific Daylight Time)
*/

SET TIMEZONE='America/Los_angeles';

CREATE OR REPLACE FUNCTION updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    NEW.updated_at = now();
RETURN NEW;
  END;

$$;


CREATE TABLE "task"(
id serial primary key,
 "title" text not null,
 "duedate" date,
 "category_id" integer,
 "priority_id" integer,
 "complete" boolean,
 "description" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_task_category_id ON "task" USING btree ("category_id");
CREATE INDEX idx_task_priority_id ON "task" USING btree ("priority_id");

CREATE TRIGGER tr_u_task BEFORE UPDATE ON task FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "task" IS 'To-Do List';
COMMENT ON COLUMN "task"."title" IS 'Title';
COMMENT ON COLUMN "task"."duedate" IS 'Due date';
COMMENT ON COLUMN "task"."category_id" IS 'Category';
COMMENT ON COLUMN "task"."priority_id" IS 'Priority';
COMMENT ON COLUMN "task"."complete" IS 'Complete';
COMMENT ON COLUMN "task"."description" IS 'Description';

CREATE TABLE IF NOT EXISTS "task_category"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "task_category"(id, name) VALUES (1,'Home'),
(2,'Work'),
(3,'Fun'),
(4,'Others'),
(5,'Misc.');

ALTER SEQUENCE task_category_id_seq RESTART WITH 6;


CREATE TABLE IF NOT EXISTS "task_priority"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "task_priority"(id, name) VALUES (1,'1 - ASAP'),
(2,'2 - Urgent'),
(3,'3 - Important'),
(4,'4 - Medium'),
(5,'5 - Low');

ALTER SEQUENCE task_priority_id_seq RESTART WITH 6;


CREATE TABLE "contact"(
id serial primary key,
 "lastname" text not null,
 "firstname" text not null,
 "jobtitle" text,
 "company" text,
 "email" text,
 "web" text,
 "category_id" integer,
 "phone" text,
 "phonecell" text,
 "phonehome" text,
 "fax" text,
 "address" text,
 "city" text,
 "state" text,
 "zip" text,
 "country" text,
 "notes" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_contact_category_id ON "contact" USING btree ("category_id");

CREATE TRIGGER tr_u_contact BEFORE UPDATE ON contact FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "contact" IS 'Address book';
COMMENT ON COLUMN "contact"."lastname" IS 'Last name';
COMMENT ON COLUMN "contact"."firstname" IS 'First name';
COMMENT ON COLUMN "contact"."jobtitle" IS 'Title';
COMMENT ON COLUMN "contact"."company" IS 'Company';
COMMENT ON COLUMN "contact"."email" IS 'email';
COMMENT ON COLUMN "contact"."web" IS 'web';
COMMENT ON COLUMN "contact"."category_id" IS 'Category';
COMMENT ON COLUMN "contact"."phone" IS 'Work Phone';
COMMENT ON COLUMN "contact"."phonecell" IS 'Cell.';
COMMENT ON COLUMN "contact"."phonehome" IS 'Home Phone';
COMMENT ON COLUMN "contact"."fax" IS 'Fax';
COMMENT ON COLUMN "contact"."address" IS 'Address';
COMMENT ON COLUMN "contact"."city" IS 'City';
COMMENT ON COLUMN "contact"."state" IS 'State';
COMMENT ON COLUMN "contact"."zip" IS 'Zip';
COMMENT ON COLUMN "contact"."country" IS 'Country';
COMMENT ON COLUMN "contact"."notes" IS 'Notes';

CREATE TABLE IF NOT EXISTS "contact_category"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "contact_category"(id, name) VALUES (1,'Friends'),
(2,'Family'),
(3,'Work'),
(4,'Meditation'),
(5,'Travel'),
(6,'Business'),
(7,'Sport'),
(8,'Restaurants'),
(9,'Misc.');

ALTER SEQUENCE contact_category_id_seq RESTART WITH 10;


CREATE TABLE "comics"(
id serial primary key,
 "title" text not null,
 "authors" text,
 "genre_id" integer,
 "serie_nb" integer,
 "have_nb" integer,
 "have" text,
 "language_id" integer,
 "complete" boolean,
 "finished" boolean,
 "url_bdfugue" text,
 "url_amazon" text,
 "pix" text,
 "notes" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_comics_genre_id ON "comics" USING btree ("genre_id");
CREATE INDEX idx_comics_language_id ON "comics" USING btree ("language_id");

CREATE TRIGGER tr_u_comics BEFORE UPDATE ON comics FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "comics" IS 'Graphic novels';
COMMENT ON COLUMN "comics"."title" IS 'Title';
COMMENT ON COLUMN "comics"."authors" IS 'Authors';
COMMENT ON COLUMN "comics"."genre_id" IS 'Genre';
COMMENT ON COLUMN "comics"."serie_nb" IS 'Albums';
COMMENT ON COLUMN "comics"."have_nb" IS 'Owned';
COMMENT ON COLUMN "comics"."have" IS 'Have';
COMMENT ON COLUMN "comics"."language_id" IS 'Language';
COMMENT ON COLUMN "comics"."complete" IS 'Complete';
COMMENT ON COLUMN "comics"."finished" IS 'Finished';
COMMENT ON COLUMN "comics"."url_bdfugue" IS 'BDFugue';
COMMENT ON COLUMN "comics"."url_amazon" IS 'Amazon';
COMMENT ON COLUMN "comics"."pix" IS 'Cover';
COMMENT ON COLUMN "comics"."notes" IS 'Notes';

CREATE TABLE IF NOT EXISTS "comics_genre"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "comics_genre"(id, name) VALUES (1,'Adventure'),
(3,'Erotic'),
(2,'Fairy tale'),
(4,'Fantastic'),
(14,'Graphic novel'),
(5,'Heroic Fantasy'),
(6,'Historic'),
(7,'Humor'),
(8,'One of a kind'),
(11,'Science-fiction'),
(12,'Super Heros'),
(10,'Thriller'),
(13,'Western'),
(9,'Youth');

ALTER SEQUENCE comics_genre_id_seq RESTART WITH 15;


CREATE TABLE IF NOT EXISTS "comics_language"(
 id serial primary key,
 name text NOT NULL,
 icon text
);

INSERT INTO "comics_language"(id, name, icon) VALUES (2,'French','comics/flags/fr.png'),
(1,'American','comics/flags/us.png');

ALTER SEQUENCE comics_language_id_seq RESTART WITH 3;


CREATE TABLE "restaurant"(
id serial primary key,
 "name" text not null,
 "cuisine_id" integer,
 "price_id" integer,
 "web" text,
 "yelp" text,
 "favorite" text,
 "hours" text,
 "notes" text,
 "phone" text,
 "address" text,
 "city" text,
 "state" text,
 "zip" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_restaurant_cuisine_id ON "restaurant" USING btree ("cuisine_id");
CREATE INDEX idx_restaurant_price_id ON "restaurant" USING btree ("price_id");

CREATE TRIGGER tr_u_restaurant BEFORE UPDATE ON restaurant FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "restaurant" IS 'Restaurants';
COMMENT ON COLUMN "restaurant"."name" IS 'Name';
COMMENT ON COLUMN "restaurant"."cuisine_id" IS 'Cuisine';
COMMENT ON COLUMN "restaurant"."price_id" IS 'Price';
COMMENT ON COLUMN "restaurant"."web" IS 'web';
COMMENT ON COLUMN "restaurant"."yelp" IS 'Yelp';
COMMENT ON COLUMN "restaurant"."favorite" IS 'Favorite dish';
COMMENT ON COLUMN "restaurant"."hours" IS 'Hours';
COMMENT ON COLUMN "restaurant"."notes" IS 'Notes';
COMMENT ON COLUMN "restaurant"."phone" IS 'Phone';
COMMENT ON COLUMN "restaurant"."address" IS 'Address';
COMMENT ON COLUMN "restaurant"."city" IS 'City';
COMMENT ON COLUMN "restaurant"."state" IS 'State';
COMMENT ON COLUMN "restaurant"."zip" IS 'Zip';

CREATE TABLE IF NOT EXISTS "restaurant_cuisine"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "restaurant_cuisine"(id, name) VALUES (1,'French'),
(2,'Vietnamese'),
(3,'Chinese'),
(4,'Fusion'),
(5,'Japanese'),
(6,'Thai'),
(7,'Mexican'),
(8,'Mediterranean'),
(9,'American'),
(10,'Indian'),
(11,'Korean'),
(12,'Italian'),
(13,'Spanish'),
(14,'Others');

ALTER SEQUENCE restaurant_cuisine_id_seq RESTART WITH 10;


CREATE TABLE IF NOT EXISTS "restaurant_price"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "restaurant_price"(id, name) VALUES (1,'$'),
(2,'$$'),
(3,'$$$'),
(4,'$$$$'),
(5,'$$$$$');

ALTER SEQUENCE restaurant_price_id_seq RESTART WITH 6;


CREATE TABLE "wine"(
id serial primary key,
 "name" text not null,
 "vintage" integer not null,
 "winery" text not null,
 "bsize_id" integer,
 "grape_id" integer,
 "type_id" integer,
 "appellation" text,
 "country_id" integer,
 "region" text,
 "area" text,
 "label_img" text,
 "buying_date" date,
 "price" double precision,
 "value" double precision,
 "purchased" integer,
 "remaining" integer,
 "notes" text,
 "drink_from" integer,
 "drink_to" integer,
 "peak_from" integer,
 "peak_to" integer,
 "meal" text,
 "score_id" integer,
 "score_parker" integer,
 "score_winespectator" integer,
 "comments" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_wine_bsize_id ON "wine" USING btree ("bsize_id");
CREATE INDEX idx_wine_grape_id ON "wine" USING btree ("grape_id");
CREATE INDEX idx_wine_type_id ON "wine" USING btree ("type_id");
CREATE INDEX idx_wine_country_id ON "wine" USING btree ("country_id");
CREATE INDEX idx_wine_score_id ON "wine" USING btree ("score_id");

CREATE TRIGGER tr_u_wine BEFORE UPDATE ON wine FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "wine" IS 'Wine cellar';
COMMENT ON COLUMN "wine"."name" IS 'Name';
COMMENT ON COLUMN "wine"."vintage" IS 'Vintage';
COMMENT ON COLUMN "wine"."winery" IS 'Winery';
COMMENT ON COLUMN "wine"."bsize_id" IS 'Bottle size';
COMMENT ON COLUMN "wine"."grape_id" IS 'Grape';
COMMENT ON COLUMN "wine"."type_id" IS 'Type';
COMMENT ON COLUMN "wine"."appellation" IS 'Appellation';
COMMENT ON COLUMN "wine"."country_id" IS 'Country';
COMMENT ON COLUMN "wine"."region" IS 'Region';
COMMENT ON COLUMN "wine"."area" IS 'Area';
COMMENT ON COLUMN "wine"."label_img" IS 'Label';
COMMENT ON COLUMN "wine"."buying_date" IS 'Buying date';
COMMENT ON COLUMN "wine"."price" IS 'Price';
COMMENT ON COLUMN "wine"."value" IS 'Value';
COMMENT ON COLUMN "wine"."purchased" IS 'Bottles purchased';
COMMENT ON COLUMN "wine"."remaining" IS 'Remaining';
COMMENT ON COLUMN "wine"."notes" IS 'Notes';
COMMENT ON COLUMN "wine"."drink_from" IS 'Drink from (year)';
COMMENT ON COLUMN "wine"."drink_to" IS 'to';
COMMENT ON COLUMN "wine"."peak_from" IS 'Peak from';
COMMENT ON COLUMN "wine"."peak_to" IS 'to';
COMMENT ON COLUMN "wine"."meal" IS 'Meal';
COMMENT ON COLUMN "wine"."score_id" IS 'My score';
COMMENT ON COLUMN "wine"."score_parker" IS 'Parker';
COMMENT ON COLUMN "wine"."score_winespectator" IS 'Wine Spectator';
COMMENT ON COLUMN "wine"."comments" IS 'Comments';

CREATE TABLE IF NOT EXISTS "wine_bsize"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "wine_bsize"(id, name) VALUES (1,'750 ml'),
(2,'500 ml'),
(3,'375 cl'),
(4,'1.5 L'),
(5,'3.0 L'),
(6,'6.0 L'),
(7,'8.0 L');

ALTER SEQUENCE wine_bsize_id_seq RESTART WITH 8;


CREATE TABLE IF NOT EXISTS "wine_grape"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "wine_grape"(id, name) VALUES (1,'Chardonnay'),
(2,'Shiraz'),
(3,'Merlot'),
(4,'Pinot Noir'),
(5,'Cabernet'),
(6,'Zinfandel'),
(7,'Sauvignon'),
(8,'Cabernet Sauvignon'),
(9,'Aligoté'),
(10,'Alvarinho'),
(11,'Blanc Fumé'),
(12,'Bual'),
(13,'Carignan'),
(14,'Chasselas'),
(15,'Chemin Blanc'),
(16,'Cinsault'),
(17,'Clairette'),
(18,'Colombard'),
(19,'Counoise'),
(20,'Fendant'),
(21,'Folle Blanche'),
(22,'Fürmint'),
(23,'Gamay'),
(24,'Gewürztraminer'),
(25,'Grauburgunder'),
(26,'Grechetto'),
(27,'Grenache Blanc'),
(28,'Grenache Noir'),
(29,'Gros Plan'),
(30,'Grüner Veltliner'),
(31,'Italienischer Riestling'),
(32,'Kadarka'),
(33,'Kerner'),
(34,'Macabeo'),
(35,'Malmsey'),
(36,'Malvasier'),
(37,'Marsanne'),
(38,'Melon de Bourgogne'),
(39,'Mourvèdre'),
(40,'Müller-Thurgau'),
(41,'Muscadelle'),
(42,'Muscadet'),
(43,'Musca'),
(44,'Musca d''Alsace'),
(45,'Muskateller'),
(46,'Nebbiolo'),
(47,'Palomino'),
(48,'Pedro Ximérez'),
(49,'Petit Verdot'),
(50,'Pinot Blanc'),
(51,'Pinot Gris'),
(52,'Pinot Noir'),
(53,'Pinotage'),
(54,'Riesling'),
(55,'Ruländer'),
(56,'Sangiovese'),
(57,'Sauvignon Blanc'),
(58,'Scheurebe'),
(59,'Sémilion'),
(60,'Sercial'),
(61,'Seyval Blanc'),
(62,'Siegerrebe'),
(63,'Silvaner'),
(64,'Spätburgunder'),
(65,'Steen'),
(66,'Syrah'),
(67,'Tempranillo'),
(68,'Tokay'),
(69,'Traminer'),
(70,'Trebbiano'),
(71,'Ugni Blanc'),
(72,'Verdejo'),
(73,'Verdelho'),
(74,'Vermentino'),
(75,'Vernaccia'),
(76,'Viognier'),
(77,'Viura'),
(78,'Weißburgunder');

ALTER SEQUENCE wine_grape_id_seq RESTART WITH 79;


CREATE TABLE IF NOT EXISTS "wine_type"(
 id serial primary key,
 name text NOT NULL,
 icon text
);

INSERT INTO "wine_type"(id, name, icon) VALUES (1,'Red','wine/winered.gif'),
(2,'White','wine/winewhite.gif'),
(3,'Sweet','wine/winesweet.gif'),
(4,'Sparkling','wine/winespark.gif'),
(5,'Rose','wine/winerose.gif');

ALTER SEQUENCE wine_type_id_seq RESTART WITH 6;


CREATE TABLE IF NOT EXISTS "wine_country"(
 id serial primary key,
 name text NOT NULL,
 icon text
);

INSERT INTO "wine_country"(id, name, icon) VALUES (1,'Argentina','wine/flags/ar.png'),
(2,'Austria','wine/flags/at.png'),
(3,'Bulgaria','wine/flags/bg.png'),
(4,'Canada','wine/flags/ca.png'),
(5,'Chile','wine/flags/cl.png'),
(6,'Cyprus','wine/flags/cy.png'),
(7,'France','wine/flags/fr.png'),
(8,'Germany','wine/flags/de.png'),
(9,'Greece','wine/flags/gr.png'),
(10,'Hungary','wine/flags/hu.png'),
(11,'Italy','wine/flags/it.png'),
(12,'Luxembourg','wine/flags/lu.png'),
(13,'New Zealand','wine/flags/nz.png'),
(14,'Portugal','wine/flags/pt.png'),
(15,'South Africa','wine/flags/za.png'),
(16,'Spain','wine/flags/es.png'),
(17,'Switzerland','wine/flags/ch.png'),
(18,'United States','wine/flags/us.png');

ALTER SEQUENCE wine_country_id_seq RESTART WITH 19;


CREATE TABLE IF NOT EXISTS "wine_score"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "wine_score"(id, name) VALUES (1,'*'),
(2,'**'),
(3,'***'),
(4,'****'),
(5,'*****');

ALTER SEQUENCE wine_score_id_seq RESTART WITH 6;


CREATE TABLE "wine_tasting"(
id serial primary key,
 "drink_date" date not null,
 "wine_id" integer NOT NULL REFERENCES "wine"(id) ON DELETE CASCADE,
 "taste" text,
 "robe" text,
 "nose" text,
 "notes" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_wine_tasting_wine_id ON "wine_tasting" USING btree ("wine_id");

CREATE TRIGGER tr_u_wine_tasting BEFORE UPDATE ON wine_tasting FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "wine_tasting" IS 'Wine tastings';
COMMENT ON COLUMN "wine_tasting"."drink_date" IS 'Date';
COMMENT ON COLUMN "wine_tasting"."wine_id" IS 'Wine';
COMMENT ON COLUMN "wine_tasting"."taste" IS 'Taste';
COMMENT ON COLUMN "wine_tasting"."robe" IS 'Robe';
COMMENT ON COLUMN "wine_tasting"."nose" IS 'Nose';
COMMENT ON COLUMN "wine_tasting"."notes" IS 'Note';

CREATE TABLE "music_album"(
id serial primary key,
 "title" text not null,
 "artist_id" integer,
 "url" text,
 "length" text,
 "description" text,
 "cover" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_music_album_artist_id ON "music_album" USING btree ("artist_id");

CREATE TRIGGER tr_u_music_album BEFORE UPDATE ON music_album FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "music_album" IS 'Albums';
COMMENT ON COLUMN "music_album"."title" IS 'Title';
COMMENT ON COLUMN "music_album"."artist_id" IS 'Artist';
COMMENT ON COLUMN "music_album"."url" IS 'Amazon';
COMMENT ON COLUMN "music_album"."length" IS 'Length';
COMMENT ON COLUMN "music_album"."description" IS 'Description';
COMMENT ON COLUMN "music_album"."cover" IS 'Cover';

CREATE TABLE "music_artist"(
id serial primary key,
 "name" text not null,
 "url" text,
 "bdate" date,
 "photo" text,
 "description" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER tr_u_music_artist BEFORE UPDATE ON music_artist FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "music_artist" IS 'Artists';
COMMENT ON COLUMN "music_artist"."name" IS 'Name';
COMMENT ON COLUMN "music_artist"."url" IS 'Web site';
COMMENT ON COLUMN "music_artist"."bdate" IS 'Birth date';
COMMENT ON COLUMN "music_artist"."photo" IS 'Photo';
COMMENT ON COLUMN "music_artist"."description" IS 'Description';

CREATE TABLE "music_track"(
id serial primary key,
 "name" text not null,
 "album_id" integer,
 "length" text,
 "genre_id" integer,
 "description" text,
 created_at timestamp  without time zone DEFAULT timezone('utc'::text, now()),
 updated_at timestamp  without time zone DEFAULT timezone('utc'::text, now())
);
CREATE INDEX idx_music_track_album_id ON "music_track" USING btree ("album_id");
CREATE INDEX idx_music_track_genre_id ON "music_track" USING btree ("genre_id");

CREATE TRIGGER tr_u_music_track BEFORE UPDATE ON music_track FOR EACH ROW EXECUTE PROCEDURE updated_at();
COMMENT ON TABLE "music_track" IS 'Tracks';
COMMENT ON COLUMN "music_track"."name" IS 'Name';
COMMENT ON COLUMN "music_track"."album_id" IS 'Album';
COMMENT ON COLUMN "music_track"."length" IS 'Length';
COMMENT ON COLUMN "music_track"."genre_id" IS 'Genre';
COMMENT ON COLUMN "music_track"."description" IS 'Description';

CREATE TABLE IF NOT EXISTS "music_genre"(
 id serial primary key,
 name text NOT NULL
);

INSERT INTO "music_genre"(id, name) VALUES (1,'Blues'),
(2,'Classical'),
(3,'Country'),
(4,'Electronic'),
(5,'Folk'),
(6,'Jazz'),
(7,'New age'),
(8,'Reggae'),
(9,'Soul');

ALTER SEQUENCE music_genre_id_seq RESTART WITH 10;

