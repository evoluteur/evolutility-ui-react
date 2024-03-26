/*
  Evolutility
  SQL Script to populate Evolutility demo DB on PostgreSQL.
  https://github.com/evoluteur/evolutility-models
  Fri Nov 03 2023 21:48:22 GMT-0700 (Pacific Daylight Time)
*/

INSERT INTO "task"("title","priority_id","category_id","complete","description") VALUES
('Release Evolutility',3,4,false,'10 generic views + a ui-modeling language.');
INSERT INTO "task"("title","duedate","priority_id","category_id","complete","description") VALUES
('Fix open bugs','2023-11-25',3,2,false,'Not many are left.'),
('Testing App','2023-10-11',3,2,false,'test'),
('Prepare demo','2023-11-12',1,2,false,'Check this out');
INSERT INTO "task"("title","priority_id","category_id","complete","description") VALUES
('Test latest code',5,2,true,'notes for my test todo task.');
INSERT INTO "task"("title","priority_id","category_id","complete") VALUES
('Car wash',5,1,false);
INSERT INTO "task"("title","duedate","priority_id","category_id","complete") VALUES
('Watch Inception','2025-01-01',5,3,true);
INSERT INTO "task"("title","duedate","priority_id","category_id","complete","description") VALUES
('Test TODO','2024-01-01',1,4,true,'Test TODO ');
INSERT INTO "task"("title","priority_id","category_id","complete") VALUES
('Dentist',3,1,true);
INSERT INTO "task"("title","duedate","priority_id","category_id","complete","description") VALUES
('French translation','2024-01-01',4,4,true,'Evolutility en Français');
INSERT INTO "task"("title","duedate","priority_id","category_id","complete") VALUES
('Italian translation','2024-01-01',4,4,true),
('Chinese translation','2024-01-01',4,4,false),
('Japanese translation','2024-01-01',4,4,false),
('German translation','2024-01-01',4,4,false),
('Russian translation','2024-01-01',4,4,false),
('Klingon translation','2024-01-01',5,4,false),
('Add sample data','2023-11-23',3,4,true);
INSERT INTO "task"("title","priority_id","category_id","complete") VALUES
('Checkout cool restaurant near the office',3,3,false),
('Code optimization',3,3,false),
('GraphQL',3,3,false),
('Setup demo server',2,2,false);

INSERT INTO "contact"("firstname","lastname","company","address","city","state","zip","phonecell","email","web","category_id","country") VALUES
('James','Butt','Benton, John B Jr','6649 N Blue Gum St','New Orleans','LA',70116,'504-845-1427','jbutt@gmail.com','http://www.bentonjohnbjr.com',6,'US'),
('Josephine','Darakjy','Chanay, Jeffrey A Esq','4 B Blue Ridge Blvd','Brighton','MI',48116,'810-374-9840','josephine_darakjy@darakjy.org','http://www.chanayjeffreyaesq.com',7,'US'),
('Art','Venere','Chemel, James L Cpa','8 W Cerritos Ave #54','Bridgeport','NJ','08014','856-264-4130','art@venere.org','http://www.chemeljameslcpa.com',6,'US'),
('Lenna','Paprocki','Feltz Printing Service','639 Main St','Anchorage','AK',99501,'907-921-2010','lpaprocki@hotmail.com','http://www.feltzprintingservice.com',6,'US'),
('Donette','Foller','Printing Dimensions','34 Center St','Hamilton','OH',45011,'513-549-4561','donette.foller@cox.net','http://www.printingdimensions.com',6,'US'),
('Simona','Morasca','Chapman, Ross E Esq','3 Mcauley Dr','Ashland','OH',44805,'419-800-6759','simona@morasca.com','http://www.chapmanrosseesq.com',6,'US'),
('Mitsue','Tollner','Morlong Associates','7 Eads St','Chicago','IL',60632,'773-924-8565','mitsue_tollner@yahoo.com','http://www.morlongassociates.com',2,'US'),
('Leota','Dilliard','Commercial Press','7 W Jackson Blvd','San Jose','CA',95111,'408-813-1105','leota@hotmail.com','http://www.commercialpress.com',1,'US'),
('Sage','Wieser','Truhlar And Truhlar Attys','5 Boston Ave #88','Sioux Falls','SD',57105,'605-794-4895','sage_wieser@cox.net','http://www.truhlarandtruhlarattys.com',6,'US'),
('Kris','Marrier','King, Christopher A Esq','228 Runamuck Pl #2808','Baltimore','MD',21224,'410-804-4694','kris@gmail.com','http://www.kingchristopheraesq.com',6,'US'),
('Minna','Amigon','Dorl, James J Esq','2371 Jerrold Ave','Kulpsville','PA',19443,'215-422-8694','minna_amigon@yahoo.com','http://www.dorljamesjesq.com',1,'US'),
('Abel','Maclead','Rangoni Of Florence','37275 St  Rt 17m M','Middle Island','NY',11953,'631-677-3675','amaclead@gmail.com','http://www.rangoniofflorence.com',6,'US'),
('Kiley','Caldarera','Feiner Bros','25 E 75th St #69','Los Angeles','CA',90034,'310-254-3084','kiley.caldarera@aol.com','http://www.feinerbros.com',1,'US'),
('Graciela','Ruta','Buckley Miller & Wright','98 Connecticut Ave Nw','Chagrin Falls','OH',44023,'440-579-7763','gruta@cox.net','http://www.buckleymillerwright.com',1,'US'),
('Cammy','Albares','Rousseaux, Michael Esq','56 E Morehead St','Laredo','TX',78045,'956-841-7216','calbares@gmail.com','http://www.rousseauxmichaelesq.com',9,'US'),
('Mattie','Poquette','Century Communications','73 State Road 434 E','Phoenix','AZ',85013,'602-953-6360','mattie@aol.com','http://www.centurycommunications.com',4,'US'),
('Meaghan','Garufi','Bolton, Wilbur Esq','69734 E Carrillo St','Mc Minnville','TN',37110,'931-235-7959','meaghan@hotmail.com','http://www.boltonwilburesq.com',4,'US'),
('Gladys','Rim','T M Byxbee Company Pc','322 New Horizon Blvd','Milwaukee','WI',53207,'414-377-2880','gladys.rim@rim.org','http://www.tmbyxbeecompanypc.com',6,'US'),
('Yuki','Whobrey','Farmers Insurance Group','1 State Route 27','Taylor','MI',48180,'313-341-4470','yuki_whobrey@aol.com','http://www.farmersinsurancegroup.com',7,'US'),
('Fletcher','Flosi','Post Box Services Plus','394 Manchester Blvd','Rockford','IL',61109,'815-426-5657','fletcher.flosi@yahoo.com','http://www.postboxservicesplus.com',9,'US'),
('Bette','Nicka','Sport En Art','6 S 33rd St','Aston','PA',19014,'610-492-4643','bette_nicka@cox.net','http://www.sportenart.com',6,'US'),
('Veronika','Inouye','C 4 Network Inc','6 Greenleaf Ave','San Jose','CA',95111,'408-813-4592','vinouye@aol.com','http://www.cnetworkinc.com',1,'US'),
('Willard','Kolmetz','Ingalls, Donald R Esq','618 W Yakima Ave','Irving','TX',75062,'972-896-4882','willard@hotmail.com','http://www.ingallsdonaldresq.com',1,'US'),
('Maryann','Royster','Franklin, Peter L Esq','74 S Westgate St','Albany','NY',12204,'518-448-8982','mroyster@royster.com','http://www.franklinpeterlesq.com',7,'US'),
('Alisha','Slusarski','Wtlz Power 107 Fm','3273 State St','Middlesex','NJ','08846','732-635-3453','alisha@slusarski.com','http://www.wtlzpowerfm.com',1,'US'),
('Allene','Iturbide','Ledecky, David Esq','1 Central Ave','Stevens Point','WI',54481,'715-530-9863','allene_iturbide@cox.net','http://www.ledeckydavidesq.com',2,'US'),
('Chanel','Caudy','Professional Image Inc','86 Nw 66th St #8673','Shawnee','KS',66218,'913-899-1103','chanel.caudy@caudy.org','http://www.professionalimageinc.com',6,'US'),
('Ezekiel','Chui','Sider, Donald C Esq','2 Cedar Ave #84','Easton','MD',21601,'410-235-8738','ezekiel@chui.com','http://www.siderdonaldcesq.com',6,'US'),
('Willow','Kusko','U Pull It','90991 Thorburn Ave','New York','NY',10011,'212-934-5167','wkusko@yahoo.com','http://www.upullit.com',1,'US'),
('Bernardo','Figeroa','Clark, Richard Cpa','386 9th Ave N','Conroe','TX',77301,'936-597-3614','bfigeroa@aol.com','http://www.clarkrichardcpa.com',1,'US'),
('Ammie','Corrio','Moskowitz, Barry S','74874 Atlantic Ave','Columbus','OH',43215,'614-648-3265','ammie@corrio.com','http://www.moskowitzbarrys.com',6,'US'),
('Francine','Vocelka','Cascade Realty Advisors Inc','366 South Dr','Las Cruces','NM',88011,'505-335-5293','francine_vocelka@vocelka.com','http://www.cascaderealtyadvisorsinc.com',1,'US'),
('Ernie','Stenseth','Knwz Newsradio','45 E Liberty St','Ridgefield Park','NJ','07660','201-387-9093','ernie_stenseth@aol.com','http://www.knwznewsradio.com',6,'US'),
('Albina','Glick','Giampetro, Anthony D','4 Ralph Ct','Dunellen','NJ','08812','732-782-6701','albina@glick.com','http://www.giampetroanthonyd.com',7,'US'),
('Alishia','Sergi','Milford Enterprises Inc','2742 Distribution Way','New York','NY',10025,'212-753-2740','asergi@gmail.com','http://www.milfordenterprisesinc.com',1,'US'),
('Solange','Shinko','Mosocco, Ronald A','426 Wolf St','Metairie','LA',70002,'504-265-8174','solange@shinko.com','http://www.mosoccoronalda.com',1,'US'),
('Jose','Stockham','Tri State Refueler Co','128 Bransten Rd','New York','NY',10011,'212-569-4233','jose@yahoo.com','http://www.tristaterefuelerco.com',6,'US'),
('Rozella','Ostrosky','Parkway Company','17 Morena Blvd','Camarillo','CA',93012,'805-609-1531','rozella.ostrosky@ostrosky.com','http://www.parkwaycompany.com',7,'US'),
('Valentine','Gillian','Fbs Business Finance','775 W 17th St','San Antonio','TX',78204,'210-300-6244','valentine_gillian@gmail.com','http://www.fbsbusinessfinance.com',1,'US'),
('Kati','Rulapaugh','Eder Assocs Consltng Engrs Pc','6980 Dorsett Rd','Abilene','KS',67410,'785-219-7724','kati.rulapaugh@hotmail.com','http://www.ederassocsconsltngengrspc.com',1,'US'),
('Youlanda','Schemmer','Tri M Tool Inc','2881 Lewis Rd','Prineville','OR',97754,'541-993-2611','youlanda@aol.com','http://www.trimtoolinc.com',7,'US'),
('Dyan','Oldroyd','International Eyelets Inc','7219 Woodfield Rd','Overland Park','KS',66204,'913-645-8918','doldroyd@aol.com','http://www.internationaleyeletsinc.com',2,'US'),
('Roxane','Campain','Rapid Trading Intl','1048 Main St','Fairbanks','AK',99708,'907-335-6568','roxane@hotmail.com','http://www.rapidtradingintl.com',1,'US'),
('Lavera','Perin','Abc Enterprises Inc','678 3rd Ave','Miami','FL',33196,'305-995-2078','lperin@perin.org','http://www.abcenterprisesinc.com',7,'US'),
('Erick','Ferencz','Cindy Turner Associates','20 S Babcock St','Fairbanks','AK',99712,'907-227-6777','erick.ferencz@aol.com','http://www.cindyturnerassociates.com',1,'US'),
('Fatima','Saylors','Stanton, James D Esq','2 Lighthouse Ave','Hopkins','MN',55343,'952-479-2375','fsaylors@saylors.org','http://www.stantonjamesdesq.com',1,'US'),
('Jina','Briddick','Grace Pastries Inc','38938 Park Blvd','Boston','MA','02128','617-997-5771','jina_briddick@briddick.com','http://www.gracepastriesinc.com',1,'US'),
('Kanisha','Waycott','Schroer, Gene E Esq','5 Tomahawk Dr','Los Angeles','CA',90006,'323-315-7314','kanisha_waycott@yahoo.com','http://www.schroergeneeesq.com',1,'US'),
('Emerson','Bowley','Knights Inn','762 S Main St','Madison','WI',53711,'608-658-7940','emerson.bowley@bowley.org','http://www.knightsinn.com',1,'US'),
('Blair','Malet','Bollinger Mach Shp & Shipyard','209 Decker Dr','Philadelphia','PA',19132,'215-794-4519','bmalet@yahoo.com','http://www.bollingermachshpshipyard.com',1,'US'),
('Brock','Bolognia','Orinda News','4486 W O St #1','New York','NY',10003,'212-617-5063','bbolognia@yahoo.com','http://www.orindanews.com',1,'US'),
('Lorrie','Nestle','Ballard Spahr Andrews','39 S 7th St','Tullahoma','TN',37388,'931-303-6041','lnestle@hotmail.com','http://www.ballardspahrandrews.com',7,'US'),
('Sabra','Uyetake','Lowy Limousine Service','98839 Hawthorne Blvd #6101','Columbia','SC',29201,'803-681-3678','sabra@uyetake.org','http://www.lowylimousineservice.com',5,'US'),
('Marjory','Mastella','Vicon Corporation','71 San Mateo Ave','Wayne','PA',19087,'610-379-7125','mmastella@mastella.com','http://www.viconcorporation.com',1,'US'),
('Karl','Klonowski','Rossi, Michael M','76 Brooks St #9','Flemington','NJ','08822','908-470-4661','karl_klonowski@yahoo.com','http://www.rossimichaelm.com',4,'US'),
('Tonette','Wenner','Northwest Publishing','4545 Courthouse Rd','Westbury','NY',11590,'516-333-4861','twenner@aol.com','http://www.northwestpublishing.com',1,'US'),
('Amber','Monarrez','Branford Wire & Mfg Co','14288 Foster Ave #4121','Jenkintown','PA',19046,'215-329-6386','amber_monarrez@monarrez.org','http://www.branfordwiremfgco.com',6,'US'),
('Shenika','Seewald','East Coast Marketing','4 Otis St','Van Nuys','CA',91405,'818-749-8650','shenika@gmail.com','http://www.eastcoastmarketing.com',1,'US'),
('Delmy','Ahle','Wye Technologies Inc','65895 S 16th St','Providence','RI','02909','401-559-8961','delmy.ahle@hotmail.com','http://www.wyetechnologiesinc.com',6,'US'),
('Deeanna','Juhas','Healy, George W Iv','14302 Pennsylvania Ave','Huntingdon Valley','PA',19006,'215-417-9563','deeanna_juhas@gmail.com','http://www.healygeorgewiv.com',1,'US'),
('Blondell','Pugh','Alpenlite Inc','201 Hawk Ct','Providence','RI','02904','401-300-8122','bpugh@aol.com','http://www.alpenliteinc.com',7,'US'),
('Jamal','Vanausdal','Hubbard, Bruce Esq','53075 Sw 152nd Ter #615','Monroe Township','NJ','08831','732-904-2931','jamal@vanausdal.org','http://www.hubbardbruceesq.com',6,'US'),
('Cecily','Hollack','Arthur A Oliver & Son Inc','59 N Groesbeck Hwy','Austin','TX',78731,'512-861-3814','cecily@hollack.org','http://www.arthuraoliversoninc.com',2,'US'),
('Carmelina','Lindall','George Jessop Carter Jewelers','2664 Lewis Rd','Littleton','CO',80126,'303-874-5160','carmelina_lindall@lindall.com','http://www.georgejessopcarterjewelers.com',6,'US'),
('Maurine','Yglesias','Schultz, Thomas C Md','59 Shady Ln #53','Milwaukee','WI',53214,'414-573-7719','maurine_yglesias@yglesias.com','http://www.schultzthomascmd.com',6,'US'),
('Tawna','Buvens','H H H Enterprises Inc','3305 Nabell Ave #679','New York','NY',10009,'212-462-9157','tawna@gmail.com','http://www.hhhenterprisesinc.com',6,'US'),
('Penney','Weight','Hawaiian King Hotel','18 Fountain St','Anchorage','AK',99515,'907-873-2882','penney_weight@aol.com','http://www.hawaiiankinghotel.com',7,'US'),
('Elly','Morocco','Killion Industries','7 W 32nd St','Erie','PA',16502,'814-420-3553','elly_morocco@gmail.com','http://www.killionindustries.com',1,'US'),
('Ilene','Eroman','Robinson, William J Esq','2853 S Central Expy','Glen Burnie','MD',21061,'410-937-4543','ilene.eroman@hotmail.com','http://www.robinsonwilliamjesq.com',1,'US'),
('Vallie','Mondella','Private Properties','74 W College St','Boise','ID',83707,'208-737-8439','vmondella@mondella.com','http://www.privateproperties.com',1,'US'),
('Kallie','Blackwood','Rowley Schlimgen Inc','701 S Harrison Rd','San Francisco','CA',94104,'415-604-7609','kallie.blackwood@gmail.com','http://www.rowleyschlimgeninc.com',1,'US'),
('Johnetta','Abdallah','Forging Specialties','1088 Pinehurst St','Chapel Hill','NC',27514,'919-715-3791','johnetta_abdallah@aol.com','http://www.forgingspecialties.com',7,'US'),
('Bobbye','Rhym','Smits, Patricia Garity','30 W 80th St #1995','San Carlos','CA',94070,'650-811-9032','brhym@rhym.com','http://www.smitspatriciagarity.com',7,'US'),
('Micaela','Rhymes','H Lee Leonard Attorney At Law','20932 Hedley St','Concord','CA',94520,'925-522-7798','micaela_rhymes@gmail.com','http://www.hleeleonardattorneyatlaw.com',6,'US'),
('Tamar','Hoogland','A K Construction Co','2737 Pistorio Rd #9230','London','OH',43140,'740-526-5410','tamar@hotmail.com','http://www.akconstructionco.com',7,'US'),
('Moon','Parlato','Ambelang, Jessica M Md','74989 Brandon St','Wellsville','NY',14895,'585-498-4278','moon@yahoo.com','http://www.ambelangjessicammd.com',1,'US'),
('Laurel','Reitler','Q A Service','6 Kains Ave','Baltimore','MD',21215,'410-957-6903','laurel_reitler@reitler.com','http://www.qaservice.com',1,'US'),
('Delisa','Crupi','Wood & Whitacre Contractors','47565 W Grand Ave','Newark','NJ','07105','973-847-9611','delisa.crupi@crupi.com','http://www.woodwhitacrecontractors.com',1,'US'),
('Viva','Toelkes','Mark Iv Press Ltd','4284 Dorigo Ln','Chicago','IL',60647,'773-352-3437','viva.toelkes@gmail.com','http://www.markivpressltd.com',6,'US'),
('Elza','Lipke','Museum Of Science & Industry','6794 Lake Dr E','Newark','NJ','07104','973-796-3667','elza@yahoo.com','http://www.museumofscienceindustry.com',1,'US'),
('Devorah','Chickering','Garrison Ind','31 Douglas Blvd #950','Clovis','NM',88101,'505-950-1763','devorah@hotmail.com','http://www.garrisonind.com',9,'US'),
('Timothy','Mulqueen','Saronix Nymph Products','44 W 4th St','Staten Island','NY',10309,'718-654-7063','timothy_mulqueen@mulqueen.org','http://www.saronixnymphproducts.com',6,'US'),
('Arlette','Honeywell','Smc Inc','11279 Loytan St','Jacksonville','FL',32254,'904-514-9918','ahoneywell@honeywell.com','http://www.smcinc.com',6,'US'),
('Dominque','Dickerson','E A I Electronic Assocs Inc','69 Marquette Ave','Hayward','CA',94545,'510-901-7640','dominque.dickerson@dickerson.org','http://www.eaielectronicassocsinc.com',7,'US'),
('Lettie','Isenhower','Conte, Christopher A Esq','70 W Main St','Beachwood','OH',44122,'216-733-8494','lettie_isenhower@yahoo.com','http://www.contechristopheraesq.com',6,'US'),
('Myra','Munns','Anker Law Office','461 Prospect Pl #316','Euless','TX',76040,'817-451-3518','mmunns@cox.net','http://www.ankerlawoffice.com',3,'US'),
('Stephaine','Barfield','Beutelschies & Company','47154 Whipple Ave Nw','Gardena','CA',90247,'310-968-1219','stephaine@barfield.com','http://www.beutelschiescompany.com',6,'US'),
('Lai','Gato','Fligg, Kenneth I Jr','37 Alabama Ave','Evanston','IL',60201,'847-957-4614','lai.gato@gato.org','http://www.fliggkennethijr.com',1,'US'),
('Stephen','Emigh','Sharp, J Daniel Esq','3777 E Richmond St #900','Akron','OH',44302,'330-700-2312','stephen_emigh@hotmail.com','http://www.sharpjdanielesq.com',1,'US'),
('Tyra','Shields','Assink, Anne H Esq','3 Fort Worth Ave','Philadelphia','PA',19106,'215-228-8264','tshields@gmail.com','http://www.assinkannehesq.com',2,'US'),
('Tammara','Wardrip','Jewel My Shop Inc','4800 Black Horse Pike','Burlingame','CA',94010,'650-216-5075','twardrip@cox.net','http://www.jewelmyshopinc.com',6,'US'),
('Cory','Gibes','Chinese Translation Resources','83649 W Belmont Ave','San Gabriel','CA',91776,'626-696-2777','cory.gibes@gmail.com','http://www.chinesetranslationresources.com',1,'US'),
('Danica','Bruschke','Stevens, Charles T','840 15th Ave','Waco','TX',76708,'254-205-1422','danica_bruschke@gmail.com','http://www.stevenscharlest.com',7,'US'),
('Wilda','Giguere','Mclaughlin, Luther W Cpa','1747 Calle Amanecer #2','Anchorage','AK',99501,'907-914-9482','wilda@cox.net','http://www.mclaughlinlutherwcpa.com',7,'US'),
('Elvera','Benimadho','Tree Musketeers','99385 Charity St #840','San Jose','CA',95110,'408-440-8447','elvera.benimadho@cox.net','http://www.treemusketeers.com',4,'US'),
('Carma','Vanheusen','Springfield Div Oh Edison Co','68556 Central Hwy','San Leandro','CA',94577,'510-452-4835','carma@cox.net','http://www.springfielddivohedisonco.com',6,'US'),
('Malinda','Hochard','Logan Memorial Hospital','55 Riverside Ave','Indianapolis','IN',46202,'317-472-2412','malinda.hochard@yahoo.com','http://www.loganmemorialhospital.com',2,'US'),
('Natalie','Fern','Kelly, Charles G Esq','7140 University Ave','Rock Springs','WY',82901,'307-279-3793','natalie.fern@hotmail.com','http://www.kellycharlesgesq.com',7,'US'),
('Lisha','Centini','Industrial Paper Shredders Inc','64 5th Ave #1153','Mc Lean','VA',22102,'703-475-7568','lisha@centini.org','http://www.industrialpapershreddersinc.com',1,'US'),
('Arlene','Klusman','Beck Horizon Builders','3 Secor Rd','New Orleans','LA',70112,'504-946-1807','arlene_klusman@gmail.com','http://www.beckhorizonbuilders.com',7,'US'),
('Alease','Buemi','Porto Cayo At Hawks Cay','4 Webbs Chapel Rd','Boulder','CO',80303,'303-521-9860','alease@buemi.com','http://www.portocayoathawkscay.com',7,'US'),
('Louisa','Cronauer','Pacific Grove Museum Ntrl Hist','524 Louisiana Ave Nw','San Leandro','CA',94577,'510-472-7758','louisa@cronauer.com','http://www.pacificgrovemuseumntrlhist.com',1,'US'),
('Angella','Cetta','Bender & Hatley Pc','185 Blackstone Bldge','Honolulu','HI',96817,'808-475-2310','angella.cetta@hotmail.com','http://www.benderhatleypc.com',6,'US'),
('Cyndy','Goldammer','Di Cristina J & Son','170 Wyoming Ave','Burnsville','MN',55337,'952-938-9457','cgoldammer@cox.net','http://www.dicristinajson.com',1,'US'),
('Rosio','Cork','Green Goddess','4 10th St W','High Point','NC',27263,'336-497-4407','rosio.cork@gmail.com','http://www.greengoddess.com',7,'US'),
('Celeste','Korando','American Arts & Graphics','7 W Pinhook Rd','Lynbrook','NY',11563,'516-365-7266','ckorando@hotmail.com','http://www.americanartsgraphics.com',6,'US'),
('Twana','Felger','Opryland Hotel','1 Commerce Way','Portland','OR',97224,'503-909-7167','twana.felger@felger.org','http://www.oprylandhotel.com',6,'US'),
('Estrella','Samu','Marking Devices Pubg Co','64 Lakeview Ave','Beloit','WI',53511,'608-942-8836','estrella@aol.com','http://www.markingdevicespubgco.com',1,'US'),
('Donte','Kines','W Tc Industries Inc','3 Aspen St','Worcester','MA','01602','508-843-1426','dkines@hotmail.com','http://www.wtcindustriesinc.com',1,'US'),
('Tiffiny','Steffensmeier','Whitehall Robbins Labs Divsn','32860 Sierra Rd','Miami','FL',33133,'305-304-6573','tiffiny_steffensmeier@cox.net','http://www.whitehallrobbinslabsdivsn.com',6,'US'),
('Edna','Miceli','Sampler','555 Main St','Erie','PA',16502,'814-299-2877','emiceli@miceli.org','http://www.sampler.com',3,'US'),
('Sue','Kownacki','Juno Chefs Incorporated','2 Se 3rd Ave','Mesquite','TX',75149,'972-742-4000','sue@aol.com','http://www.junochefsincorporated.com',1,'US'),
('Jesusa','Shin','Carroccio, A Thomas Esq','2239 Shawnee Mission Pky','Tullahoma','TN',37388,'931-739-1551','jshin@shin.com','http://www.carroccioathomasesq.com',6,'US'),
('Rolland','Francescon','Stanley, Richard L Esq','2726 Charcot Ave','Paterson','NJ','07501','973-284-4048','rolland@cox.net','http://www.stanleyrichardlesq.com',1,'US'),
('Pamella','Schmierer','K Cs Cstm Mouldings Windows','5161 Dorsett Rd','Homestead','FL',33030,'305-575-8481','pamella.schmierer@schmierer.org','http://www.kcscstmmouldingswindows.com',7,'US'),
('Glory','Kulzer','Comfort Inn','55892 Jacksonville Rd','Owings Mills','MD',21117,'410-916-8015','gkulzer@kulzer.org','http://www.comfortinn.com',1,'US'),
('Shawna','Palaspas','Windsor, James L Esq','5 N Cleveland Massillon Rd','Thousand Oaks','CA',91362,'805-638-6617','shawna_palaspas@palaspas.org','http://www.windsorjameslesq.com',2,'US'),
('Brandon','Callaro','Jackson Shields Yeiser','7 Benton Dr','Honolulu','HI',96819,'808-240-5168','brandon_callaro@hotmail.com','http://www.jacksonshieldsyeiser.com',1,'US'),
('Scarlet','Cartan','Box, J Calvin Esq','9390 S Howell Ave','Albany','GA',31701,'229-365-9658','scarlet.cartan@yahoo.com','http://www.boxjcalvinesq.com',1,'US');
INSERT INTO "contact"("firstname","lastname","company","address","state","zip","phonecell","email","web","category_id","country") VALUES
('Oretha','Menter','Custom Engineering Inc','8on','MA','02210','617-697-6024','oretha_menter@yahoo.com','http://www.customengineeringinc.com',7,'US');
INSERT INTO "contact"("firstname","lastname","company","address","city","state","zip","phonecell","email","web","category_id","country") VALUES
('Ty','Smith','Bresler Eitel Framg Gllry Ltd','4646 Kaahumanu St','Hackensack','NJ','07601','201-995-3149','tsmith@aol.com','http://www.breslereitelframggllryltd.com',1,'US'),
('Xuan','Rochin','Carol, Drake Sparks Esq','2 Monroe St','San Mateo','CA',94403,'650-247-2625','xuan@gmail.com','http://www.caroldrakesparksesq.com',4,'US'),
('Lindsey','Dilello','Biltmore Investors Bank','52777 Leaders Heights Rd','Ontario','CA',91761,'909-589-1693','lindsey.dilello@hotmail.com','http://www.biltmoreinvestorsbank.com',7,'US'),
('Devora','Perez','Desco Equipment Corp','72868 Blackington Ave','Oakland','CA',94606,'510-755-9274','devora_perez@perez.org','http://www.descoequipmentcorp.com',1,'US'),
('Herman','Demesa','Merlin Electric Co','9 Norristown Rd','Troy','NY',12180,'518-931-7852','hdemesa@cox.net','http://www.merlinelectricco.com',9,'US');
INSERT INTO "contact"("firstname","lastname","company","address","state","zip","phonecell","email","web","category_id","country") VALUES
('Rory','Papasergi','Bailey Cntl Co Div Babcock','83s Summit','PA',18411,'570-469-8401','rpapasergi@cox.net','http://www.baileycntlcodivbabcock.com',7,'US');
INSERT INTO "contact"("firstname","lastname","company","address","city","state","zip","phonecell","email","web","category_id","country") VALUES
('Talia','Riopelle','Ford Brothers Wholesale Inc','1 N Harlem Ave #9','Orange','NJ','07050','973-818-9788','talia_riopelle@aol.com','http://www.fordbrotherswholesaleinc.com',6,'US'),
('Van','Shire','Cambridge Inn','90131 J St','Pittstown','NJ','08867','908-448-1209','van.shire@shire.com','http://www.cambridgeinn.com',7,'US'),
('Lucina','Lary','Matricciani, Albert J Jr','8597 W National Ave','Cocoa','FL',32922,'321-632-4668','lucina_lary@cox.net','http://www.matriccianialbertjjr.com',7,'US'),
('Bok','Isaacs','Nelson Hawaiian Ltd','6 Gilson St','Bronx','NY',10468,'718-478-8568','bok.isaacs@aol.com','http://www.nelsonhawaiianltd.com',1,'US'),
('Rolande','Spickerman','Neland Travel Agency','65 W Maple Ave','Pearl City','HI',96782,'808-526-5863','rolande.spickerman@spickerman.com','http://www.nelandtravelagency.com',1,'US'),
('Howard','Paulas','Asendorf, J Alan Esq','866 34th Ave','Denver','CO',80231,'303-692-3118','hpaulas@gmail.com','http://www.asendorfjalanesq.com',5,'US'),
('Kimbery','Madarang','Silberman, Arthur L Esq','798 Lund Farm Way','Rockaway','NJ','07866','973-225-6259','kimbery_madarang@cox.net','http://www.silbermanarthurlesq.com',2,'US'),
('Thurman','Manno','Honey Bee Breeding Genetics &','9387 Charcot Ave','Absecon','NJ','08201','609-234-8376','thurman.manno@yahoo.com','http://www.honeybeebreedinggenetics.com',7,'US'),
('Becky','Mirafuentes','Wells Kravitz Schnitzer','30553 Washington Rd','Plainfield','NJ','07062','908-426-8272','becky.mirafuentes@mirafuentes.com','http://www.wellskravitzschnitzer.com',1,'US'),
('Beatriz','Corrington','Prohab Rehabilitation Servs','481 W Lemon St','Middleboro','MA','02346','508-315-3867','beatriz@yahoo.com','http://www.prohabrehabilitationservs.com',1,'US'),
('Marti','Maybury','Eldridge, Kristin K Esq','4 Warehouse Point Rd #7','Chicago','IL',60638,'773-539-1058','marti.maybury@yahoo.com','http://www.eldridgekristinkesq.com',1,'US'),
('Nieves','Gotter','Vlahos, John J Esq','4940 Pulaski Park Dr','Portland','OR',97202,'503-455-3094','nieves_gotter@gmail.com','http://www.vlahosjohnjesq.com',1,'US'),
('Leatha','Hagele','Ninas Indian Grs & Videos','627 Walford Ave','Dallas','TX',75227,'214-225-5850','lhagele@cox.net','http://www.ninasindiangrsvideos.com',6,'US'),
('Valentin','Klimek','Schmid, Gayanne K Esq','137 Pioneer Way','Chicago','IL',60604,'312-512-2338','vklimek@klimek.org','http://www.schmidgayannekesq.com',1,'US'),
('Melissa','Wiklund','Moapa Valley Federal Credit Un','61 13 Stoneridge #835','Findlay','OH',45840,'419-254-4591','melissa@cox.net','http://www.moapavalleyfederalcreditun.com',1,'US'),
('Sheridan','Zane','Kentucky Tennessee Clay Co','2409 Alabama Rd','Riverside','CA',92501,'951-248-6822','sheridan.zane@zane.com','http://www.kentuckytennesseeclayco.com',1,'US'),
('Bulah','Padilla','Admiral Party Rentals & Sales','8927 Vandever Ave','Waco','TX',76707,'254-816-8417','bulah_padilla@hotmail.com','http://www.admiralpartyrentalssales.com',1,'US'),
('Audra','Kohnert','Nelson, Karolyn King Esq','134 Lewis Rd','Nashville','TN',37211,'615-448-9249','audra@kohnert.com','http://www.nelsonkarolynkingesq.com',1,'US'),
('Daren','Weirather','Panasystems','9 N College Ave #3','Milwaukee','WI',53216,'414-838-3151','dweirather@aol.com','http://www.panasystems.com',1,'US'),
('Fernanda','Jillson','Shank, Edward L Esq','60480 Old Us Highway 51','Preston','MD',21655,'410-724-6472','fjillson@aol.com','http://www.shankedwardlesq.com',1,'US'),
('Gearldine','Gellinger','Megibow & Edwards','4 Bloomfield Ave','Irving','TX',75061,'972-821-7118','gearldine_gellinger@gellinger.com','http://www.megibowedwards.com',1,'US'),
('Chau','Kitzman','Benoff, Edward Esq','429 Tiger Ln','Beverly Hills','CA',90212,'310-969-7230','chau@gmail.com','http://www.benoffedwardesq.com',7,'US'),
('Theola','Frey','Woodbridge Free Public Library','54169 N Main St','Massapequa','NY',11758,'516-357-3362','theola_frey@frey.com','http://www.woodbridgefreepubliclibrary.com',6,'US'),
('Cheryl','Haroldson','New York Life John Thune','92 Main St','Atlantic City','NJ','08401','609-263-9243','cheryl@haroldson.org','http://www.newyorklifejohnthune.com',7,'US'),
('Laticia','Merced','Alinabal Inc','72 Mannix Dr','Cincinnati','OH',45203,'513-418-1566','lmerced@gmail.com','http://www.alinabalinc.com',7,'US'),
('Carissa','Batman','Poletto, Kim David Esq','12270 Caton Center Dr','Eugene','OR',97401,'541-801-5717','carissa.batman@yahoo.com','http://www.polettokimdavidesq.com',7,'US'),
('Lezlie','Craghead','Chang, Carolyn Esq','749 W 18th St #45','Smithfield','NC',27577,'919-885-2453','lezlie.craghead@craghead.org','http://www.changcarolynesq.com',7,'US'),
('Ozell','Shealy','Silver Bros Inc','8 Industry Ln','New York','NY',10002,'212-880-8865','oshealy@hotmail.com','http://www.silverbrosinc.com',7,'US'),
('Arminda','Parvis','Newtec Inc','1 Huntwood Ave','Phoenix','AZ',85017,'602-277-3025','arminda@parvis.com','http://www.newtecinc.com',9,'US'),
('Reita','Leto','Creative Business Systems','55262 N French Rd','Indianapolis','IN',46240,'317-787-5514','reita.leto@gmail.com','http://www.creativebusinesssystems.com',4,'US'),
('Yolando','Luczki','Dal Tile Corporation','422 E 21st St','Syracuse','NY',13214,'315-640-6357','yolando@cox.net','http://www.daltilecorporation.com',6,'US'),
('Lizette','Stem','Edward S Katz','501 N 19th Ave','Cherry Hill','NJ','08002','856-702-3676','lizette.stem@aol.com','http://www.edwardskatz.com',1,'US'),
('Gregoria','Pawlowicz','Oh My Goodknits Inc','455 N Main Ave','Garden City','NY',11530,'516-376-4230','gpawlowicz@yahoo.com','http://www.ohmygoodknitsinc.com',1,'US'),
('Carin','Deleo','Redeker, Debbie','1844 Southern Blvd','Little Rock','AR',72202,'501-409-6072','cdeleo@deleo.com','http://www.redekerdebbie.com',2,'US'),
('Chantell','Maynerich','Desert Sands Motel','2023 Greg St','Saint Paul','MN',55101,'651-776-9688','chantell@yahoo.com','http://www.desertsandsmotel.com',6,'US'),
('Dierdre','Yum','Cummins Southern Plains Inc','63381 Jenks Ave','Philadelphia','PA',19134,'215-346-4666','dyum@yahoo.com','http://www.cumminssouthernplainsinc.com',1,'US'),
('Larae','Gudroe','Lehigh Furn Divsn Lehigh','6651 Municipal Rd','Houma','LA',70360,'985-261-5783','larae_gudroe@gmail.com','http://www.lehighfurndivsnlehigh.com',1,'US'),
('Latrice','Tolfree','United Van Lines Agent','81 Norris Ave #525','Ronkonkoma','NY',11779,'631-998-2102','latrice.tolfree@hotmail.com','http://www.unitedvanlinesagent.com',4,'US'),
('Kerry','Theodorov','Capitol Reporters','6916 W Main St','Sacramento','CA',95827,'916-770-7448','kerry.theodorov@gmail.com','http://www.capitolreporters.com',6,'US'),
('Dorthy','Hidvegi','Kwik Kopy Printing','9635 S Main St','Boise','ID',83704,'208-690-3315','dhidvegi@yahoo.com','http://www.kwikkopyprinting.com',1,'US'),
('Fannie','Lungren','Centro Inc','17 Us Highway 111','Round Rock','TX',78664,'512-528-9933','fannie.lungren@yahoo.com','http://www.centroinc.com',9,'US'),
('Evangelina','Radde','Campbell, Jan Esq','992 Civic Center Dr','Philadelphia','PA',19123,'215-417-5612','evangelina@aol.com','http://www.campbelljanesq.com',9,'US'),
('Novella','Degroot','Evans, C Kelly Esq','303 N Radcliffe St','Hilo','HI',96720,'808-746-1865','novella_degroot@degroot.org','http://www.evansckellyesq.com',1,'US'),
('Clay','Hoa','Scat Enterprises','73 Saint Ann St #86','Reno','NV',89502,'775-848-9135','choa@hoa.org','http://www.scatenterprises.com',6,'US'),
('Jennifer','Fallick','Nagle, Daniel J Esq','44 58th St','Wheeling','IL',60090,'847-800-3054','jfallick@yahoo.com','http://www.nagledanieljesq.com',5,'US'),
('Irma','Wolfgramm','Serendiquity Bed & Breakfast','9745 W Main St','Randolph','NJ','07869','973-868-8660','irma.wolfgramm@hotmail.com','http://www.serendiquitybedbreakfast.com',7,'US'),
('Eun','Coody','Ray Carolyne Realty','84 Bloomfield Ave','Spartanburg','SC',29301,'864-594-4578','eun@yahoo.com','http://www.raycarolynerealty.com',6,'US'),
('Sylvia','Cousey','Berg, Charles E','287 Youngstown Warren Rd','Hampstead','MD',21074,'410-863-8263','sylvia_cousey@cousey.org','http://www.bergcharlese.com',6,'US'),
('Nana','Wrinkles','Ray, Milbern D','6 Van Buren St','Mount Vernon','NY',10553,'914-796-3775','nana@aol.com','http://www.raymilbernd.com',1,'US'),
('Layla','Springe','Chadds Ford Winery','229 N Forty Driv','New York','NY',10011,'212-253-7448','layla.springe@cox.net','http://www.chaddsfordwinery.com',1,'US'),
('Joesph','Degonia','A R Packaging','2887 Knowlton St #5435','Berkeley','CA',94710,'510-942-5916','joesph_degonia@degonia.org','http://www.arpackaging.com',1,'US'),
('Annabelle','Boord','Corn Popper','523 Marquette Ave','Concord','MA','01742','978-289-7717','annabelle.boord@cox.net','http://www.cornpopper.com',5,'US'),
('Stephaine','Vinning','Birite Foodservice Distr','3717 Hamann Industrial Pky','San Francisco','CA',94104,'415-712-9530','stephaine@cox.net','http://www.biritefoodservicedistr.com',4,'US'),
('Nelida','Sawchuk','Anchorage Museum Of Hist & Art','3 State Route 35 S','Paramus','NJ','07652','201-247-8925','nelida@gmail.com','http://www.anchoragemuseumofhistart.com',6,'US'),
('Marguerita','Hiatt','Haber, George D Md','82 N Highway 67','Oakley','CA',94561,'925-541-8521','marguerita.hiatt@gmail.com','http://www.habergeorgedmd.com',6,'US'),
('Carmela','Cookey','Royal Pontiac Olds Inc','9 Murfreesboro Rd','Chicago','IL',60623,'773-297-9391','ccookey@cookey.org','http://www.royalpontiacoldsinc.com',9,'US'),
('Junita','Brideau','Leonards Antiques Inc','6 S Broadway St','Cedar Grove','NJ','07009','973-582-5469','jbrideau@aol.com','http://www.leonardsantiquesinc.com',1,'US'),
('Claribel','Varriano','Meca','6 Harry L Dr #6327','Perrysburg','OH',43551,'419-573-2033','claribel_varriano@cox.net','http://www.meca.com',5,'US'),
('Benton','Skursky','Nercon Engineering & Mfg Inc','47939 Porter Ave','Gardena','CA',90248,'310-694-8466','benton.skursky@aol.com','http://www.nerconengineeringmfginc.com',1,'US'),
('Hillary','Skulski','Replica I','9 Wales Rd Ne #914','Homosassa','FL',34448,'352-990-5946','hillary.skulski@aol.com','http://www.replicai.com',1,'US'),
('Merilyn','Bayless','20 20 Printing Inc','195 13n N','Santa Clara','CA',95054,'408-346-2180','merilyn_bayless@cox.net','http://www.printinginc.com',6,'US'),
('Teri','Ennaco','Publishers Group West','99 Tank Farm Rd','Hazleton','PA',18201,'570-355-1665','tennaco@gmail.com','http://www.publishersgroupwest.com',1,'US'),
('Merlyn','Lawler','Nischwitz, Jeffrey L Esq','4671 Alemany Blvd','Jersey City','NJ','07304','201-858-9960','merlyn_lawler@hotmail.com','http://www.nischwitzjeffreylesq.com',7,'US'),
('Georgene','Montezuma','Payne Blades & Wellborn Pa','98 University Dr','San Ramon','CA',94583,'925-943-3449','gmontezuma@cox.net','http://www.paynebladeswellbornpa.com',6,'US'),
('Jettie','Mconnell','Coldwell Bnkr Wright Real Est','50 E Wacker Dr','Bridgewater','NJ','08807','908-602-5258','jmconnell@hotmail.com','http://www.coldwellbnkrwrightrealest.com',4,'US'),
('Lemuel','Latzke','Computer Repair Service','70 Euclid Ave #722','Bohemia','NY',11716,'631-291-4976','lemuel.latzke@gmail.com','http://www.computerrepairservice.com',9,'US'),
('Melodie','Knipp','Fleetwood Building Block Inc','326 E Main St #6496','Thousand Oaks','CA',91362,'805-810-8964','mknipp@gmail.com','http://www.fleetwoodbuildingblockinc.com',6,'US'),
('Candida','Corbley','Colts Neck Medical Assocs Inc','406 Main St','Somerville','NJ','08876','908-943-6103','candida_corbley@hotmail.com','http://www.coltsneckmedicalassocsinc.com',7,'US'),
('Karan','Karpin','New England Taxidermy','3 Elmwood Dr','Beaverton','OR',97005,'503-707-5812','karan_karpin@gmail.com','http://www.newenglandtaxidermy.com',7,'US'),
('Andra','Scheyer','Ludcke, George O Esq','9 Church St','Salem','OR',97302,'503-950-3068','andra@gmail.com','http://www.ludckegeorgeoesq.com',1,'US'),
('Felicidad','Poullion','Mccorkle, Tom S Esq','9939 N 14th St','Riverton','NJ','08077','856-828-6021','fpoullion@poullion.com','http://www.mccorkletomsesq.com',1,'US'),
('Belen','Strassner','Eagle Software Inc','5384 Southwyck Blvd','Douglasville','GA',30135,'770-802-4003','belen_strassner@aol.com','http://www.eaglesoftwareinc.com',6,'US'),
('Gracia','Melnyk','Juvenile & Adult Super','97 Airport Loop Dr','Jacksonville','FL',32216,'904-627-4341','gracia@melnyk.com','http://www.juvenileadultsuper.com',1,'US'),
('Jolanda','Hanafan','Perez, Joseph J Esq','37855 Nolan Rd','Bangor','ME','04401','207-233-6185','jhanafan@gmail.com','http://www.perezjosephjesq.com',7,'US'),
('Barrett','Toyama','Case Foundation Co','4252 N Washington Ave #9','Kennedale','TX',76060,'817-577-6151','barrett.toyama@toyama.org','http://www.casefoundationco.com',2,'US'),
('Helga','Fredicks','Eis Environmental Engrs Inc','42754 S Ash Ave','Buffalo','NY',14228,'716-854-9845','helga_fredicks@yahoo.com','http://www.eisenvironmentalengrsinc.com',6,'US'),
('Ashlyn','Pinilla','Art Crafters','703 Beville Rd','Opa Locka','FL',33054,'305-857-5489','apinilla@cox.net','http://www.artcrafters.com',7,'US'),
('Fausto','Agramonte','Marriott Hotels Resorts Suites','5 Harrison Rd','New York','NY',10038,'212-778-3063','fausto_agramonte@yahoo.com','http://www.marriotthotelsresortssuites.com',6,'US'),
('Ronny','Caiafa','Remaco Inc','73 Southern Blvd','Philadelphia','PA',19103,'215-511-3531','ronny.caiafa@caiafa.org','http://www.remacoinc.com',1,'US'),
('Marge','Limmel','Bjork, Robert D Jr','189 Village Park Rd','Crestview','FL',32536,'850-330-8079','marge@gmail.com','http://www.bjorkrobertdjr.com',6,'US'),
('Norah','Waymire','Carmichael, Jeffery L Esq','6 Middlegate Rd #106','San Francisco','CA',94107,'415-874-2984','norah.waymire@gmail.com','http://www.carmichaeljefferylesq.com',1,'US'),
('Aliza','Baltimore','Andrews, J Robert Esq','1128 Delaware St','San Jose','CA',95132,'408-425-1994','aliza@aol.com','http://www.andrewsjrobertesq.com',1,'US'),
('Mozell','Pelkowski','Winship & Byrne','577 Parade St','South San Francisco','CA',94080,'650-960-1069','mpelkowski@pelkowski.org','http://www.winshipbyrne.com',1,'US'),
('Viola','Bitsuie','Burton & Davis','70 Mechanic St','Northridge','CA',91325,'818-481-5787','viola@gmail.com','http://www.burtondavis.com',1,'US'),
('Franklyn','Emard','Olympic Graphic Arts','4379 Highway 116','Philadelphia','PA',19103,'215-483-3003','femard@emard.com','http://www.olympicgraphicarts.com',6,'US'),
('Willodean','Konopacki','Magnuson','55 Hawthorne Blvd','Lafayette','LA',70506,'337-774-7564','willodean_konopacki@konopacki.org','http://www.magnuson.com',1,'US'),
('Beckie','Silvestrini','A All American Travel Inc','7116 Western Ave','Dearborn','MI',48126,'313-390-7855','beckie.silvestrini@silvestrini.com','http://www.aallamericantravelinc.com',7,'US'),
('Rebecka','Gesick','Polykote Inc','2026 N Plankinton Ave #3','Austin','TX',78754,'512-693-8345','rgesick@gesick.org','http://www.polykoteinc.com',1,'US'),
('Frederica','Blunk','Jets Cybernetics','99586 Main St','Dallas','TX',75207,'214-529-1949','frederica_blunk@gmail.com','http://www.jetscybernetics.com',7,'US'),
('Glen','Bartolet','Metlab Testing Services','8739 Hudson St','Vashon','WA',98070,'206-389-1482','glen_bartolet@hotmail.com','http://www.metlabtestingservices.com',5,'US'),
('Freeman','Gochal','Kellermann, William T Esq','383 Gunderman Rd #197','Coatesville','PA',19320,'610-752-2683','freeman_gochal@aol.com','http://www.kellermannwilliamtesq.com',6,'US'),
('Vincent','Meinerding','Arturi, Peter D Esq','4441 Point Term Mkt','Philadelphia','PA',19143,'215-829-4221','vincent.meinerding@hotmail.com','http://www.arturipeterdesq.com',1,'US'),
('Rima','Bevelacqua','Mcauley Mfg Co','2972 Lafayette Ave','Gardena','CA',90248,'310-499-4200','rima@cox.net','http://www.mcauleymfgco.com',6,'US'),
('Glendora','Sarbacher','Defur Voran Hanley Radcliff','2140 Diamond Blvd','Rohnert Park','CA',94928,'707-881-3154','gsarbacher@gmail.com','http://www.defurvoranhanleyradcliff.com',1,'US'),
('Avery','Steier','Dill Dill Carr & Stonbraker Pc','93 Redmond Rd #492','Orlando','FL',32803,'407-945-8566','avery@cox.net','http://www.dilldillcarrstonbrakerpc.com',6,'US'),
('Cristy','Lother','Kleensteel','3989 Portage Tr','Escondido','CA',92025,'760-465-4762','cristy@lother.com','http://www.kleensteel.com',7,'US'),
('Nicolette','Brossart','Goulds Pumps Inc Slurry Pump','1 Midway Rd','Westborough','MA','01581','508-504-6388','nicolette_brossart@brossart.com','http://www.gouldspumpsincslurrypump.com',1,'US'),
('Tracey','Modzelewski','Kansas City Insurance Report','77132 Coon Rapids Blvd Nw','Conroe','TX',77301,'936-988-8171','tracey@hotmail.com','http://www.kansascityinsurancereport.com',7,'US'),
('Virgina','Tegarden','Berhanu International Foods','755 Harbor Way','Milwaukee','WI',53226,'414-411-5744','virgina_tegarden@tegarden.com','http://www.berhanuinternationalfoods.com',6,'US'),
('Tiera','Frankel','Roland Ashcroft','87 Sierra Rd','El Monte','CA',91731,'626-638-4241','tfrankel@aol.com','http://www.rolandashcroft.com',1,'US'),
('Alaine','Bergesen','Hispanic Magazine','7667 S Hulen St #42','Yonkers','NY',10701,'914-654-1426','alaine_bergesen@cox.net','http://www.hispanicmagazine.com',6,'US'),
('Earleen','Mai','Little Sheet Metal Co','75684 S Withlapopka Dr #32','Dallas','TX',75227,'214-785-6750','earleen_mai@cox.net','http://www.littlesheetmetalco.com',6,'US'),
('Leonida','Gobern','Holmes, Armstead J Esq','5 Elmwood Park Blvd','Biloxi','MS',39530,'228-432-4635','leonida@gobern.org','http://www.holmesarmsteadjesq.com',1,'US'),
('Ressie','Auffrey','Faw, James C Cpa','23 Palo Alto Sq','Miami','FL',33134,'305-287-4743','ressie.auffrey@yahoo.com','http://www.fawjamesccpa.com',6,'US'),
('Justine','Mugnolo','Evans Rule Company','38062 E Main St','New York','NY',10048,'212-311-6377','jmugnolo@yahoo.com','http://www.evansrulecompany.com',9,'US'),
('Eladia','Saulter','Tyee Productions Inc','3958 S Dupont Hwy #7','Ramsey','NJ','07446','201-365-8698','eladia@saulter.com','http://www.tyeeproductionsinc.com',5,'US'),
('Chaya','Malvin','Dunnells & Duvall','560 Civic Center Dr','Ann Arbor','MI',48103,'734-408-8174','chaya@malvin.com','http://www.dunnellsduvall.com',1,'US'),
('Gwenn','Suffield','Deltam Systems Inc','3270 Dequindre Rd','Deer Park','NY',11729,'631-295-9879','gwenn_suffield@suffield.org','http://www.deltamsystemsinc.com',6,'US'),
('Salena','Karpel','Hammill Mfg Co','1 Garfield Ave #7','Canton','OH',44707,'330-618-2579','skarpel@cox.net','http://www.hammillmfgco.com',1,'US'),
('Yoko','Fishburne','Sams Corner Store','9122 Carpenter Ave','New Haven','CT','06511','203-840-8634','yoko@fishburne.com','http://www.samscornerstore.com',4,'US'),
('Taryn','Moyd','Siskin, Mark J Esq','48 Lenox St','Fairfax','VA',22030,'703-938-7939','taryn.moyd@hotmail.com','http://www.siskinmarkjesq.com',7,'US'),
('Katina','Polidori','Cape & Associates Real Estate','5 Little River Tpke','Wilmington','MA','01887','978-679-7429','katina_polidori@aol.com','http://www.capeassociatesrealestate.com',9,'US'),
('Rickie','Plumer','Merrill Lynch','3 N Groesbeck Hwy','Toledo','OH',43613,'419-313-5571','rickie.plumer@aol.com','http://www.merrilllynch.com',4,'US'),
('Alex','Loader','Sublett, Scott Esq','37 N Elm St #916','Tacoma','WA',98409,'253-875-9222','alex@loader.com','http://www.sublettscottesq.com',6,'US'),
('Lashon','Vizarro','Sentry Signs','433 Westminster Blvd #590','Roseville','CA',95661,'916-289-4526','lashon@aol.com','http://www.sentrysigns.com',1,'US'),
('Lauran','Burnard','Professionals Unlimited','66697 Park Pl #3224','Riverton','WY',82501,'307-453-7589','lburnard@burnard.com','http://www.professionalsunlimited.com',1,'US'),
('Ceola','Setter','Southern Steel Shelving Co','96263 Greenwood Pl','Warren','ME','04864','207-297-5029','ceola.setter@setter.org','http://www.southernsteelshelvingco.com',1,'US'),
('My','Rantanen','Bosco, Paul J','8 Mcarthur Ln','Richboro','PA',18954,'215-647-2158','my@hotmail.com','http://www.boscopaulj.com',1,'US'),
('Lorrine','Worlds','Longo, Nicholas J Esq','8 Fair Lawn Ave','Tampa','FL',33614,'813-863-6467','lorrine.worlds@worlds.com','http://www.longonicholasjesq.com',6,'US');
INSERT INTO "contact"("firstname","lastname","company","city","state","zip","phonecell","email","web","category_id","country") VALUES
('Peggie','Sturiale','Henry4th St','El Cajon','CA',92020,'619-695-8086','peggie@cox.net','http://www.henrycountymiddleschool.com',7,'US');
INSERT INTO "contact"("firstname","lastname","company","address","city","state","zip","phonecell","email","web","category_id","country") VALUES
('Marvel','Raymo','Edison Supply & Equipment Co','9 Vanowen St','College Station','TX',77840,'979-809-5770','mraymo@yahoo.com','http://www.edisonsupplyequipmentco.com',1,'US'),
('Daron','Dinos','Wolf, Warren R Esq','18 Waterloo Geneva Rd','Highland Park','IL',60035,'847-265-6609','daron_dinos@cox.net','http://www.wolfwarrenresq.com',7,'US'),
('An','Fritz','Linguistic Systems Inc','506 S Hacienda Dr','Atlantic City','NJ','08401','609-854-7156','an_fritz@hotmail.com','http://www.linguisticsystemsinc.com',6,'US'),
('Portia','Stimmel','Peace Christian Center','3732 Sherman Ave','Bridgewater','NJ','08807','908-670-4712','portia.stimmel@aol.com','http://www.peacechristiancenter.com',1,'US'),
('Rhea','Aredondo','Double B Foods Inc','25657 Live Oak St','Brooklyn','NY',11226,'718-280-4183','rhea_aredondo@cox.net','http://www.doublebfoodsinc.com',6,'US'),
('Benedict','Sama','Alexander & Alexander Inc','4923 Carey Ave','Saint Louis','MO',63104,'314-858-4832','bsama@cox.net','http://www.alexanderalexanderinc.com',1,'US'),
('Alyce','Arias','Fairbanks Scales','3196 S Rider Trl','Stockton','CA',95207,'209-242-7022','alyce@arias.org','http://www.fairbanksscales.com',1,'US'),
('Heike','Berganza','Cali Sportswear Cutting Dept','3 Railway Ave #75','Little Falls','NJ','07424','973-822-8827','heike@gmail.com','http://www.calisportswearcuttingdept.com',6,'US'),
('Carey','Dopico','Garofani, John Esq','87393 E Highland Rd','Indianapolis','IN',46220,'317-441-5848','carey_dopico@dopico.org','http://www.garofanijohnesq.com',7,'US'),
('Dottie','Hellickson','Thompson Fabricating Co','67 E Chestnut Hill Rd','Seattle','WA',98133,'206-295-5631','dottie@hellickson.org','http://www.thompsonfabricatingco.com',1,'US'),
('Deandrea','Hughey','Century 21 Krall Real Estate','33 Lewis Rd #46','Burlington','NC',27215,'336-467-3095','deandrea@yahoo.com','http://www.centurykrallrealestate.com',1,'US'),
('Kimberlie','Duenas','Mid Contntl Rlty & Prop Mgmt','8100 Jacksonville Rd #7','Hays','KS',67601,'785-616-1685','kimberlie_duenas@yahoo.com','http://www.midcontntlrltypropmgmt.com',6,'US'),
('Martina','Staback','Ace Signs Inc','7 W Wabansia Ave #227','Orlando','FL',32822,'407-429-2145','martina_staback@staback.com','http://www.acesignsinc.com',1,'US'),
('Skye','Fillingim','Rodeway Inn','25 Minters Chapel Rd #9','Minneapolis','MN',55401,'612-664-6304','skye_fillingim@yahoo.com','http://www.rodewayinn.com',1,'US'),
('Jade','Farrar','Bonnet & Daughter','6882 Torresdale Ave','Columbia','SC',29201,'803-975-3405','jade.farrar@yahoo.com','http://www.bonnetdaughter.com',5,'US'),
('Charlene','Hamilton','Oshins & Gibbons','985 E 6th Ave','Santa Rosa','CA',95407,'707-821-8037','charlene.hamilton@hotmail.com','http://www.oshinsgibbons.com',6,'US'),
('Geoffrey','Acey','Price Business Services','7 West Ave #1','Palatine','IL',60067,'847-556-2909','geoffrey@gmail.com','http://www.pricebusinessservices.com',2,'US'),
('Stevie','Westerbeck','Wise, Dennis W Md','26659 N 13th St','Costa Mesa','CA',92626,'949-903-3898','stevie.westerbeck@yahoo.com','http://www.wisedenniswmd.com',1,'US'),
('Pamella','Fortino','Super 8 Motel','669 Packerland Dr #1438','Denver','CO',80212,'303-794-1341','pamella@fortino.com','http://www.supermotel.com',1,'US'),
('Harrison','Haufler','John Wagner Associates','759 Eldora St','New Haven','CT','06515','203-801-8497','hhaufler@hotmail.com','http://www.johnwagnerassociates.com',6,'US'),
('Johnna','Engelberg','Thrifty Oil Co','5 S Colorado Blvd #449','Bothell','WA',98021,'425-700-3751','jengelberg@engelberg.org','http://www.thriftyoilco.com',7,'US'),
('Buddy','Cloney','Larkfield Photo','944 Gaither Dr','Strongsville','OH',44136,'440-327-2093','buddy.cloney@yahoo.com','http://www.larkfieldphoto.com',6,'US'),
('Dalene','Riden','Silverman Planetarium','66552 Malone Rd','Plaistow','NH','03865','603-745-7497','dalene.riden@aol.com','http://www.silvermanplanetarium.com',7,'US'),
('Jerry','Zurcher','J & F Lumber','77 Massillon Rd #822','Satellite Beach','FL',32937,'321-597-2159','jzurcher@zurcher.org','http://www.jflumber.com',7,'US'),
('Haydee','Denooyer','Cleaning Station Inc','25346 New Rd','New York','NY',10016,'212-782-3493','hdenooyer@denooyer.org','http://www.cleaningstationinc.com',6,'US'),
('Joseph','Cryer','Ames Stationers','60 Fillmore Ave','Huntington Beach','CA',92647,'714-698-2170','joseph_cryer@cox.net','http://www.amesstationers.com',9,'US'),
('Deonna','Kippley','Midas Muffler Shops','57 Haven Ave #90','Southfield','MI',48075,'248-793-4966','deonna_kippley@hotmail.com','http://www.midasmufflershops.com',7,'US'),
('Raymon','Calvaresi','Seaboard Securities Inc','6538 E Pomona St #60','Indianapolis','IN',46222,'317-342-1532','raymon.calvaresi@gmail.com','http://www.seaboardsecuritiesinc.com',6,'US'),
('Alecia','Bubash','Petersen, James E Esq','6535 Joyce St','Wichita Falls','TX',76301,'940-302-3036','alecia@aol.com','http://www.petersenjameseesq.com',1,'US'),
('Ma','Layous','Development Authority','78112 Morris Ave','North Haven','CT','06473','203-564-1543','mlayous@hotmail.com','http://www.developmentauthority.com',1,'US'),
('Detra','Coyier','Schott Fiber Optics Inc','96950 Hidden Ln','Aberdeen','MD',21001,'410-259-2118','detra@aol.com','http://www.schottfiberopticsinc.com',6,'US'),
('Terrilyn','Rodeigues','Stuart J Agins','3718 S Main St','New Orleans','LA',70130,'504-635-8518','terrilyn.rodeigues@cox.net','http://www.stuartjagins.com',7,'US'),
('Salome','Lacovara','Mitsumi Electronics Corp','9677 Commerce Dr','Richmond','VA',23219,'804-858-1011','slacovara@gmail.com','http://www.mitsumielectronicscorp.com',6,'US'),
('Garry','Keetch','Italian Express Franchise Corp','5 Green Pond Rd #4','Southampton','PA',18966,'215-846-9046','garry_keetch@hotmail.com','http://www.italianexpressfranchisecorp.com',1,'US'),
('Matthew','Neither','American Council On Sci & Hlth','636 Commerce Dr #42','Shakopee','MN',55379,'952-906-4597','mneither@yahoo.com','http://www.americancouncilonscihlth.com',1,'US'),
('Theodora','Restrepo','Kleri, Patricia S Esq','42744 Hamann Industrial Pky #82','Miami','FL',33136,'305-573-1085','theodora.restrepo@restrepo.com','http://www.kleripatriciasesq.com',1,'US'),
('Noah','Kalafatis','Twiggs Abrams Blanchard','1950 5th Ave','Milwaukee','WI',53209,'414-660-9766','noah.kalafatis@aol.com','http://www.twiggsabramsblanchard.com',1,'US'),
('Carmen','Sweigard','Maui Research & Technology Pk','61304 N French Rd','Somerset','NJ','08873','732-445-6940','csweigard@sweigard.com','http://www.mauiresearchtechnologypk.com',1,'US'),
('Lavonda','Hengel','Bradley Nameplate Corp','87 Imperial Ct #79','Fargo','ND',58102,'701-421-7080','lavonda@cox.net','http://www.bradleynameplatecorp.com',7,'US'),
('Junita','Stoltzman','Geonex Martel Inc','94 W Dodge Rd','Carson City','NV',89701,'775-578-1214','junita@aol.com','http://www.geonexmartelinc.com',1,'US'),
('Herminia','Nicolozakes','Sea Island Div Of Fstr Ind Inc','4 58th St #3519','Scottsdale','AZ',85254,'602-304-6433','herminia@nicolozakes.org','http://www.seaislanddivoffstrindinc.com',1,'US'),
('Casie','Good','Papay, Debbie J Esq','5221 Bear Valley Rd','Nashville','TN',37211,'615-825-4297','casie.good@aol.com','http://www.papaydebbiejesq.com',1,'US'),
('Reena','Maisto','Lane Promotions','9648 S Main','Salisbury','MD',21801,'410-951-2667','reena@hotmail.com','http://www.lanepromotions.com',1,'US'),
('Mirta','Mallett','Stephen Kennerly Archts Inc Pc','7 S San Marcos Rd','New York','NY',10004,'212-745-6948','mirta_mallett@gmail.com','http://www.stephenkennerlyarchtsincpc.com',1,'US'),
('Cathrine','Pontoriero','Business Systems Of Wis Inc','812 S Haven St','Amarillo','TX',79109,'806-558-5848','cathrine.pontoriero@pontoriero.com','http://www.businesssystemsofwisinc.com',6,'US'),
('Filiberto','Tawil','Flash, Elena Salerno Esq','3882 W Congress St #799','Los Angeles','CA',90016,'323-842-8226','ftawil@hotmail.com','http://www.flashelenasalernoesq.com',5,'US'),
('Raul','Upthegrove','Neeley, Gregory W Esq','4 E Colonial Dr','La Mesa','CA',91942,'619-666-4765','rupthegrove@yahoo.com','http://www.neeleygregorywesq.com',7,'US'),
('Sarah','Candlish','Alabama Educational Tv Comm','45 2nd Ave #9759','Atlanta','GA',30328,'770-531-2842','sarah.candlish@gmail.com','http://www.alabamaeducationaltvcomm.com',7,'US'),
('Lucy','Treston','Franz Inc','57254 Brickell Ave #372','Worcester','MA','01602','508-502-5634','lucy@cox.net','http://www.franzinc.com',1,'US'),
('Judy','Aquas','Plantation Restaurant','8977 Connecticut Ave Nw #3','Niles','MI',49120,'269-431-9464','jaquas@aquas.com','http://www.plantationrestaurant.com',1,'US'),
('Yvonne','Tjepkema','Radio Communications Co','9 Waydell St','Fairfield','NJ','07004','973-976-8627','yvonne.tjepkema@hotmail.com','http://www.radiocommunicationsco.com',6,'US'),
('Kayleigh','Lace','Dentalaw Divsn Hlth Care','43 Huey P Long Ave','Lafayette','LA',70508,'337-751-2326','kayleigh.lace@yahoo.com','http://www.dentalawdivsnhlthcare.com',6,'US'),
('Felix','Hirpara','American Speedy Printing Ctrs','7563 Cornwall Rd #4462','Denver','PA',17517,'717-583-1497','felix_hirpara@cox.net','http://www.americanspeedyprintingctrs.com',1,'US'),
('Tresa','Sweely','Grayson, Grant S Esq','22 Bridle Ln','Valley Park','MO',63088,'314-231-3514','tresa_sweely@hotmail.com','http://www.graysongrantsesq.com',7,'US'),
('Kristeen','Turinetti','Jeanerette Middle School','70099 E North Ave','Arlington','TX',76013,'817-947-9480','kristeen@gmail.com','http://www.jeanerettemiddleschool.com',1,'US'),
('Jenelle','Regusters','Haavisto, Brian F Esq','3211 E Northeast Loop','Tampa','FL',33619,'813-357-7296','jregusters@regusters.com','http://www.haavistobrianfesq.com',1,'US'),
('Renea','Monterrubio','Wmmt Radio Station','26 Montgomery St','Atlanta','GA',30328,'770-930-9967','renea@hotmail.com','http://www.wmmtradiostation.com',1,'US'),
('Olive','Matuszak','Colony Paints Sales Ofc & Plnt','13252 Lighthouse Ave','Cathedral City','CA',92234,'760-745-2649','olive@aol.com','http://www.colonypaintssalesofcplnt.com',6,'US'),
('Ligia','Reiber','Floral Expressions','206 Main St #2804','Lansing','MI',48933,'517-747-7664','lreiber@cox.net','http://www.floralexpressions.com',7,'US'),
('Christiane','Eschberger','Casco Services Inc','96541 W Central Blvd','Phoenix','AZ',85034,'602-330-6894','christiane.eschberger@yahoo.com','http://www.cascoservicesinc.com',1,'US'),
('Goldie','Schirpke','Reuter, Arthur C Jr','34 Saint George Ave #2','Bangor','ME','04401','207-748-3722','goldie.schirpke@yahoo.com','http://www.reuterarthurcjr.com',7,'US'),
('Loreta','Timenez','Kaminski, Katherine Andritsaki','47857 Coney Island Ave','Clinton','MD',20735,'301-392-6698','loreta.timenez@hotmail.com','http://www.kaminskikatherineandritsaki.com',1,'US'),
('Fabiola','Hauenstein','Sidewinder Products Corp','8573 Lincoln Blvd','York','PA',17404,'717-344-2804','fabiola.hauenstein@hauenstein.org','http://www.sidewinderproductscorp.com',9,'US'),
('Amie','Perigo','General Foam Corporation','596 Santa Maria Ave #7913','Mesquite','TX',75150,'972-898-1033','amie.perigo@yahoo.com','http://www.generalfoamcorporation.com',1,'US'),
('Raina','Brachle','Ikg Borden Divsn Harsco Corp','3829 Ventura Blvd','Butte','MT',59701,'406-374-7752','raina.brachle@brachle.org','http://www.ikgbordendivsnharscocorp.com',6,'US'),
('Erinn','Canlas','Anchor Computer Inc','13 S Hacienda Dr','Livingston','NJ','07039','973-563-9502','erinn.canlas@canlas.com','http://www.anchorcomputerinc.com',1,'US'),
('Cherry','Lietz','Sebring & Co','40 9th Ave Sw #91','Waterford','MI',48329,'248-697-7722','cherry@lietz.com','http://www.sebringco.com',6,'US'),
('Kattie','Vonasek','H A C Farm Lines Co Optv Assoc','2845 Boulder Crescent St','Cleveland','OH',44103,'216-270-9653','kattie@vonasek.org','http://www.hacfarmlinescooptvassoc.com',6,'US'),
('Lilli','Scriven','Hunter, John J Esq','33 State St','Abilene','TX',79601,'325-667-7868','lilli@aol.com','http://www.hunterjohnjesq.com',6,'US'),
('Whitley','Tomasulo','Freehold Fence Co','2 S 15th St','Fort Worth','TX',76107,'817-819-7799','whitley.tomasulo@aol.com','http://www.freeholdfenceco.com',1,'US'),
('Barbra','Adkin','Binswanger','4 Kohler Memorial Dr','Brooklyn','NY',11230,'718-732-9475','badkin@hotmail.com','http://www.binswanger.com',9,'US'),
('Hermila','Thyberg','Chilton Malting Co','1 Rancho Del Mar Shopping C','Providence','RI','02903','401-885-7681','hermila_thyberg@hotmail.com','http://www.chiltonmaltingco.com',1,'US'),
('Jesusita','Flister','Schoen, Edward J Jr','3943 N Highland Ave','Lancaster','PA',17601,'717-686-7564','jesusita.flister@hotmail.com','http://www.schoenedwardjjr.com',1,'US'),
('Caitlin','Julia','Helderman, Seymour Cpa','5 Williams St','Johnston','RI','02919','401-552-9059','caitlin.julia@julia.org','http://www.heldermanseymourcpa.com',6,'US'),
('Roosevelt','Hoffis','Denbrook, Myron','60 Old Dover Rd','Hialeah','FL',33014,'305-302-1135','roosevelt.hoffis@aol.com','http://www.denbrookmyron.com',6,'US'),
('Helaine','Halter','Lippitt, Mike','8 Sheridan Rd','Jersey City','NJ','07304','201-412-3040','hhalter@yahoo.com','http://www.lippittmike.com',1,'US'),
('Lorean','Martabano','Hiram, Hogg P Esq','85092 Southern Blvd','San Antonio','TX',78204,'210-634-2447','lorean.martabano@hotmail.com','http://www.hiramhoggpesq.com',1,'US'),
('France','Buzick','In Travel Agency','64 Newman Springs Rd E','Brooklyn','NY',11219,'718-853-3740','france.buzick@yahoo.com','http://www.intravelagency.com',1,'US'),
('Justine','Ferrario','Newhart Foods Inc','48 Stratford Ave','Pomona','CA',91768,'909-631-5703','jferrario@hotmail.com','http://www.newhartfoodsinc.com',7,'US'),
('Adelina','Nabours','Courtyard By Marriott','80 Pittsford Victor Rd #9','Cleveland','OH',44103,'216-937-5320','adelina_nabours@gmail.com','http://www.courtyardbymarriott.com',7,'US'),
('Derick','Dhamer','Studer, Eugene A Esq','87163 N Main Ave','New York','NY',10013,'212-225-9676','ddhamer@cox.net','http://www.studereugeneaesq.com',1,'US'),
('Jerry','Dallen','Seashore Supply Co Waretown','393 Lafayette Ave','Richmond','VA',23219,'804-808-9574','jerry.dallen@yahoo.com','http://www.seashoresupplycowaretown.com',1,'US'),
('Leota','Ragel','Mayar Silk Inc','99 5th Ave #33','Trion','GA',30753,'706-616-5131','leota.ragel@gmail.com','http://www.mayarsilkinc.com',7,'US'),
('Jutta','Amyot','National Medical Excess Corp','49 N Mays St','Broussard','LA',70518,'337-991-8070','jamyot@hotmail.com','http://www.nationalmedicalexcesscorp.com',7,'US'),
('Aja','Gehrett','Stero Company','993 Washington Ave','Nutley','NJ','07110','973-986-4456','aja_gehrett@hotmail.com','http://www.sterocompany.com',1,'US'),
('Kirk','Herritt','Hasting, H Duane Esq','88 15th Ave Ne','Vestal','NY',13850,'607-350-7690','kirk.herritt@aol.com','http://www.hastinghduaneesq.com',1,'US'),
('Leonora','Mauson','Insty Prints','3381 E 40th Ave','Passaic','NJ','07055','973-355-2120','leonora@yahoo.com','http://www.instyprints.com',1,'US'),
('Winfred','Brucato','Glenridge Manor Mobile Home Pk','201 Ridgewood Rd','Moscow','ID',83843,'208-793-4108','winfred_brucato@hotmail.com','http://www.glenridgemanormobilehomepk.com',7,'US'),
('Tarra','Nachor','Circuit Solution Inc','39 Moccasin Dr','San Francisco','CA',94104,'415-284-2730','tarra.nachor@cox.net','http://www.circuitsolutioninc.com',1,'US'),
('Corinne','Loder','Local Office','4 Carroll St','North Attleboro','MA','02760','508-618-7826','corinne@loder.org','http://www.localoffice.com',6,'US'),
('Dulce','Labreche','Lee Kilkelly Paulson & Kabaker','9581 E Arapahoe Rd','Rochester','MI',48307,'248-811-5696','dulce_labreche@yahoo.com','http://www.leekilkellypaulsonkabaker.com',7,'US'),
('Kate','Keneipp','Davis, Maxon R Esq','33 N Michigan Ave','Green Bay','WI',54301,'920-355-1610','kate_keneipp@yahoo.com','http://www.davismaxonresq.com',1,'US'),
('Kaitlyn','Ogg','Garrison, Paul E Esq','2 S Biscayne Blvd','Baltimore','MD',21230,'410-773-3862','kaitlyn.ogg@gmail.com','http://www.garrisonpauleesq.com',7,'US'),
('Sherita','Saras','Black History Resource Center','8 Us Highway 22','Colorado Springs','CO',80937,'719-547-9543','sherita.saras@cox.net','http://www.blackhistoryresourcecenter.com',7,'US'),
('Lashawnda','Stuer','Rodriguez, J Christopher Esq','7422 Martin Ave #8','Toledo','OH',43607,'419-399-1744','lstuer@cox.net','http://www.rodriguezjchristopheresq.com',7,'US'),
('Ernest','Syrop','Grant Family Health Center','94 Chase Rd','Hyattsville','MD',20785,'301-257-4883','ernest@cox.net','http://www.grantfamilyhealthcenter.com',1,'US'),
('Nobuko','Halsey','Goeman Wood Products Inc','8139 I Hwy 10 #92','New Bedford','MA','02745','508-897-7916','nobuko.halsey@yahoo.com','http://www.goemanwoodproductsinc.com',6,'US'),
('Lavonna','Wolny','Linhares, Kenneth A Esq','5 Cabot Rd','Mc Lean','VA',22102,'703-892-2914','lavonna.wolny@hotmail.com','http://www.linhareskennethaesq.com',1,'US'),
('Lashaunda','Lizama','Earnhardt Printing','3387 Ryan Dr','Hanover','MD',21076,'410-912-6032','llizama@cox.net','http://www.earnhardtprinting.com',2,'US'),
('Mariann','Bilden','H P G Industrys Inc','3125 Packer Ave #9851','Austin','TX',78753,'512-742-1149','mariann.bilden@aol.com','http://www.hpgindustrysinc.com',5,'US'),
('Helene','Rodenberger','Bailey Transportation Prod Inc','347 Chestnut St','Peoria','AZ',85381,'623-426-4907','helene@aol.com','http://www.baileytransportationprodinc.com',1,'US'),
('Roselle','Estell','Mcglynn Bliss Pc','8116 Mount Vernon Ave','Bucyrus','OH',44820,'419-488-6648','roselle.estell@hotmail.com','http://www.mcglynnblisspc.com',4,'US');
INSERT INTO "contact"("firstname","lastname","company","address","state","zip","phonecell","email","web","category_id","country") VALUES
('Samira','Heintzman','Mutual Fish Co','8772 Old County Rd #5410','WA',98032,'206-923-6042','sheintzman@hotmail.com','http://www.mutualfishco.com',6,'US');
INSERT INTO "contact"("firstname","lastname","company","address","city","state","zip","phonecell","email","web","category_id","country") VALUES
('Margart','Meisel','Yeates, Arthur L Aia','868 State St #38','Cincinnati','OH',45251,'513-747-9603','margart_meisel@yahoo.com','http://www.yeatesarthurlaia.com',6,'US'),
('Kristofer','Bennick','Logan, Ronald J Esq','772 W River Dr','Bloomington','IN',47404,'812-442-8544','kristofer.bennick@yahoo.com','http://www.loganronaldjesq.com',1,'US'),
('Weldon','Acuff','Advantage Martgage Company','73 W Barstow Ave','Arlington Heights','IL',60004,'847-613-5866','wacuff@gmail.com','http://www.advantagemartgagecompany.com',4,'US'),
('Shalon','Shadrick','Germer And Gertz Llp','61047 Mayfield Ave','Brooklyn','NY',11223,'718-394-4974','shalon@cox.net','http://www.germerandgertzllp.com',6,'US'),
('Denise','Patak','Spence Law Offices','2139 Santa Rosa Ave','Orlando','FL',32801,'407-808-3254','denise@patak.org','http://www.spencelawoffices.com',4,'US'),
('Louvenia','Beech','John Ortiz Nts Therapy Center','598 43rd St','Beverly Hills','CA',90210,'310-652-2379','louvenia.beech@beech.com','http://www.johnortizntstherapycenter.com',7,'US'),
('Audry','Yaw','Mike Uchrin Htg & Air Cond Inc','70295 Pioneer Ct','Brandon','FL',33511,'813-744-7100','audry.yaw@yaw.org','http://www.mikeuchrinhtgaircondinc.com',1,'US'),
('Kristel','Ehmann','Mccoy, Joy Reynolds Esq','92899 Kalakaua Ave','El Paso','TX',79925,'915-300-6100','kristel.ehmann@aol.com','http://www.mccoyjoyreynoldsesq.com',7,'US'),
('Vincenza','Zepp','Kbor 1600 Am','395 S 6th St #2','El Cajon','CA',92020,'619-935-6661','vzepp@gmail.com','http://www.kboram.com',1,'US'),
('Elouise','Gwalthney','Quality Inn Northwest','9506 Edgemore Ave','Bladensburg','MD',20710,'301-591-3034','egwalthney@yahoo.com','http://www.qualityinnnorthwest.com',1,'US'),
('Venita','Maillard','Wallace Church Assoc Inc','72119 S Walker Ave #63','Anaheim','CA',92801,'714-663-9740','venita_maillard@gmail.com','http://www.wallacechurchassocinc.com',6,'US'),
('Kasandra','Semidey','Can Tron','369 Latham St #500','Saint Louis','MO',63102,'314-697-3652','kasandra_semidey@semidey.com','http://www.cantron.com',1,'US'),
('Xochitl','Discipio','Ravaal Enterprises Inc','3158 Runamuck Pl','Round Rock','TX',78664,'512-942-3411','xdiscipio@gmail.com','http://www.ravaalenterprisesinc.com',9,'US'),
('Maile','Linahan','Thompson Steel Company Inc','9 Plainsboro Rd #598','Greensboro','NC',27409,'336-364-6037','mlinahan@yahoo.com','http://www.thompsonsteelcompanyinc.com',6,'US'),
('Krissy','Rauser','Anderson, Mark A Esq','8728 S Broad St','Coram','NY',11727,'631-288-2866','krauser@cox.net','http://www.andersonmarkaesq.com',7,'US'),
('Pete','Dubaldi','Womack & Galich','2215 Prosperity Dr','Lyndhurst','NJ','07071','201-749-8866','pdubaldi@hotmail.com','http://www.womackgalich.com',6,'US'),
('Linn','Paa','Valerie & Company','1 S Pine St','Memphis','TN',38112,'901-573-9024','linn_paa@paa.com','http://www.valeriecompany.com',6,'US'),
('Paris','Wide','Gehring Pumps Inc','187 Market St','Atlanta','GA',30342,'404-607-8435','paris@hotmail.com','http://www.gehringpumpsinc.com',4,'US'),
('Wynell','Dorshorst','Haehnel, Craig W Esq','94290 S Buchanan St','Pacifica','CA',94044,'650-749-9879','wynell_dorshorst@dorshorst.org','http://www.haehnelcraigwesq.com',7,'US'),
('Quentin','Birkner','Spoor Behrins Campbell & Young','7061 N 2nd St','Burnsville','MN',55337,'952-314-5871','qbirkner@aol.com','http://www.spoorbehrinscampbellyoung.com',1,'US'),
('Regenia','Kannady','Ken Jeter Store Equipment Inc','10759 Main St','Scottsdale','AZ',85260,'480-205-5121','regenia.kannady@cox.net','http://www.kenjeterstoreequipmentinc.com',1,'US'),
('Sheron','Louissant','Potter, Brenda J Cpa','97 E 3rd St #9','Long Island City','NY',11101,'718-613-9994','sheron@aol.com','http://www.potterbrendajcpa.com',7,'US'),
('Izetta','Funnell','Baird Kurtz & Dobson','82 Winsor St #54','Atlanta','GA',30340,'770-584-4119','izetta.funnell@hotmail.com','http://www.bairdkurtzdobson.com',7,'US'),
('Rodolfo','Butzen','Minor, Cynthia A Esq','41 Steel Ct','Northfield','MN',55057,'507-590-5237','rodolfo@hotmail.com','http://www.minorcynthiaaesq.com',7,'US'),
('Zona','Colla','Solove, Robert A Esq','49440 Dearborn St','Norwalk','CT','06854','203-938-2557','zona@hotmail.com','http://www.soloverobertaesq.com',1,'US'),
('Serina','Zagen','Mark Ii Imports Inc','7 S Beverly Dr','Fort Wayne','IN',46802,'260-382-4869','szagen@aol.com','http://www.markiiimportsinc.com',9,'US'),
('Paz','Sahagun','White Sign Div Ctrl Equip Co','919 Wall Blvd','Meridian','MS',39307,'601-249-4511','paz_sahagun@cox.net','http://www.whitesigndivctrlequipco.com',4,'US'),
('Markus','Lukasik','M & M Store Fixtures Co Inc','89 20th St E #779','Sterling Heights','MI',48310,'586-247-1614','markus@yahoo.com','http://www.mmstorefixturescoinc.com',4,'US'),
('Jaclyn','Bachman','Judah Caster & Wheel Co','721 Interstate 45 S','Colorado Springs','CO',80919,'719-223-2074','jaclyn@aol.com','http://www.judahcasterwheelco.com',6,'US'),
('Cyril','Daufeldt','Galaxy International Inc','3 Lawton St','New York','NY',10013,'212-422-5427','cyril_daufeldt@daufeldt.com','http://www.galaxyinternationalinc.com',9,'US'),
('Gayla','Schnitzler','Sigma Corp Of America','38 Pleasant Hill Rd','Hayward','CA',94545,'510-441-4055','gschnitzler@gmail.com','http://www.sigmacorpofamerica.com',1,'US'),
('Erick','Nievas','Soward, Anne Esq','45 E Acacia Ct','Chicago','IL',60624,'773-359-6109','erick_nievas@aol.com','http://www.sowardanneesq.com',1,'US'),
('Jennie','Drymon','Osborne, Michelle M Esq','63728 Poway Rd #1','Scranton','PA',18509,'570-868-8688','jennie@cox.net','http://www.osbornemichellemesq.com',1,'US'),
('Mitsue','Scipione','Students In Free Entrprs Natl','77 222 Dr','Oroville','CA',95965,'530-399-3254','mscipione@scipione.com','http://www.studentsinfreeentrprsnatl.com',6,'US'),
('Ciara','Ventura','Johnson, Robert M Esq','53 W Carey St','Port Jervis','NY',12771,'845-694-7919','cventura@yahoo.com','http://www.johnsonrobertmesq.com',1,'US'),
('Galen','Cantres','Del Charro Apartments','617 Nw 36th Ave','Brook Park','OH',44142,'216-871-6876','galen@yahoo.com','http://www.delcharroapartments.com',7,'US'),
('Truman','Feichtner','Legal Search Inc','539 Coldwater Canyon Ave','Bloomfield','NJ','07003','973-473-5108','tfeichtner@yahoo.com','http://www.legalsearchinc.com',1,'US'),
('Gail','Kitty','Service Supply Co Inc','735 Crawford Dr','Anchorage','AK',99501,'907-770-3542','gail@kitty.com','http://www.servicesupplycoinc.com',1,'US'),
('Dalene','Schoeneck','Sameshima, Douglas J Esq','910 Rahway Ave','Philadelphia','PA',19102,'215-380-8820','dalene@schoeneck.org','http://www.sameshimadouglasjesq.com',7,'US'),
('Gertude','Witten','Thompson, John Randolph Jr','7 Tarrytown Rd','Cincinnati','OH',45217,'513-863-9471','gertude.witten@gmail.com','http://www.thompsonjohnrandolphjr.com',1,'US'),
('Lizbeth','Kohl','E T Balancing Co Inc','35433 Blake St #588','Gardena','CA',90248,'310-955-5788','lizbeth@yahoo.com','http://www.etbalancingcoinc.com',3,'US'),
('Glenn','Berray','Griswold, John E Esq','29 Cherry St #7073','Des Moines','IA',50315,'515-372-1738','gberray@gmail.com','http://www.griswoldjohneesq.com',7,'US'),
('Lashandra','Klang','Acqua Group','810 N La Brea Ave','King of Prussia','PA',19406,'610-378-7332','lashandra@yahoo.com','http://www.acquagroup.com',7,'US'),
('Lenna','Newville','Brooks, Morris J Jr','987 Main St','Raleigh','NC',27601,'919-254-5987','lnewville@newville.com','http://www.brooksmorrisjjr.com',7,'US'),
('Laurel','Pagliuca','Printing Images Corp','36 Enterprise St Se','Richland','WA',99352,'509-595-6485','laurel@yahoo.com','http://www.printingimagescorp.com',6,'US'),
('Mireya','Frerking','Roberts Supply Co Inc','8429 Miller Rd','Pelham','NY',10803,'914-883-3061','mireya.frerking@hotmail.com','http://www.robertssupplycoinc.com',1,'US'),
('Annelle','Tagala','Vico Products Mfg Co','5 W 7th St','Parkville','MD',21234,'410-234-2267','annelle@yahoo.com','http://www.vicoproductsmfgco.com',1,'US'),
('Dean','Ketelsen','J M Custom Design Millwork','2 Flynn Rd','Hicksville','NY',11801,'516-732-6649','dean_ketelsen@gmail.com','http://www.jmcustomdesignmillwork.com',7,'US'),
('Levi','Munis','Farrell & Johnson Office Equip','2094 Ne 36th Ave','Worcester','MA','01603','508-658-7802','levi.munis@gmail.com','http://www.farrelljohnsonofficeequip.com',4,'US'),
('Sylvie','Ryser','Millers Market & Deli','649 Tulane Ave','Tulsa','OK',74105,'918-565-1706','sylvie@aol.com','http://www.millersmarketdeli.com',1,'US'),
('Sharee','Maile','Holiday Inn Naperville','2094 Montour Blvd','Muskegon','MI',49442,'231-265-6940','sharee_maile@aol.com','http://www.holidayinnnaperville.com',7,'US'),
('Cordelia','Storment','Burrows, Jon H Esq','393 Hammond Dr','Lafayette','LA',70506,'337-255-3427','cordelia_storment@aol.com','http://www.burrowsjonhesq.com',6,'US'),
('Mollie','Mcdoniel','Dock Seal Specialty','8590 Lake Lizzie Dr','Bowling Green','OH',43402,'419-417-4674','mollie_mcdoniel@yahoo.com','http://www.docksealspecialty.com',7,'US'),
('Brett','Mccullan','Five Star Limousines Of Tx Inc','87895 Concord Rd','La Mesa','CA',91942,'619-727-3892','brett.mccullan@mccullan.com','http://www.fivestarlimousinesoftxinc.com',6,'US'),
('Teddy','Pedrozo','Barkan, Neal J Esq','46314 Route 130','Bridgeport','CT','06610','203-918-3939','teddy_pedrozo@aol.com','http://www.barkannealjesq.com',1,'US'),
('Tasia','Andreason','Campbell, Robert A','4 Cowesett Ave','Kearny','NJ','07032','201-969-7063','tasia_andreason@yahoo.com','http://www.campbellroberta.com',7,'US'),
('Hubert','Walthall','Dee, Deanna','95 Main Ave #2','Barberton','OH',44203,'330-566-8898','hubert@walthall.org','http://www.deedeanna.com',6,'US'),
('Arthur','Farrow','Young, Timothy L Esq','28 S 7th St #2824','Englewood','NJ','07631','201-772-4377','arthur.farrow@yahoo.com','http://www.youngtimothylesq.com',6,'US'),
('Vilma','Berlanga','Wells, D Fred Esq','79 S Howell Ave','Grand Rapids','MI',49546,'616-568-4113','vberlanga@berlanga.com','http://www.wellsdfredesq.com',1,'US'),
('Billye','Miro','Gray, Francine H Esq','36 Lancaster Dr Se','Pearl','MS',39208,'601-637-5479','billye_miro@cox.net','http://www.grayfrancinehesq.com',9,'US'),
('Glenna','Slayton','Toledo Iv Care','2759 Livingston Ave','Memphis','TN',38118,'901-869-4314','glenna_slayton@cox.net','http://www.toledoivcare.com',7,'US'),
('Mitzie','Hudnall','Cangro Transmission Co','17 Jersey Ave','Englewood','CO',80110,'303-997-7760','mitzie_hudnall@yahoo.com','http://www.cangrotransmissionco.com',7,'US'),
('Bernardine','Rodefer','Sat Poly Inc','2 W Grand Ave','Memphis','TN',38112,'901-739-5892','bernardine_rodefer@yahoo.com','http://www.satpolyinc.com',6,'US'),
('Staci','Schmaltz','Midwest Contracting & Mfg Inc','18 Coronado Ave #563','Pasadena','CA',91106,'626-293-7678','staci_schmaltz@aol.com','http://www.midwestcontractingmfginc.com',1,'US'),
('Nichelle','Meteer','Print Doctor','72 Beechwood Ter','Chicago','IL',60657,'773-857-2231','nichelle_meteer@meteer.com','http://www.printdoctor.com',6,'US'),
('Janine','Rhoden','Nordic Group Inc','92 Broadway','Astoria','NY',11103,'718-728-5051','jrhoden@yahoo.com','http://www.nordicgroupinc.com',6,'US'),
('Ettie','Hoopengardner','Jackson Millwork Co','39 Franklin Ave','Richland','WA',99352,'509-847-3352','ettie.hoopengardner@hotmail.com','http://www.jacksonmillworkco.com',1,'US'),
('Eden','Jayson','Harris Corporation','4 Iwaena St','Baltimore','MD',21202,'410-429-4888','eden_jayson@yahoo.com','http://www.harriscorporation.com',1,'US'),
('Lynelle','Auber','United Cerebral Palsy Of Ne Pa','32820 Corkwood Rd','Newark','NJ','07104','973-605-6492','lynelle_auber@gmail.com','http://www.unitedcerebralpalsyofnepa.com',4,'US'),
('Merissa','Tomblin','One Day Surgery Center Inc','34 Raritan Center Pky','Bellflower','CA',90706,'562-719-7922','merissa.tomblin@gmail.com','http://www.onedaysurgerycenterinc.com',4,'US'),
('Golda','Kaniecki','Calaveras Prospect','6201 S Nevada Ave','Toms River','NJ','08755','732-617-5310','golda_kaniecki@yahoo.com','http://www.calaverasprospect.com',1,'US'),
('Catarina','Gleich','Terk, Robert E Esq','78 Maryland Dr #146','Denville','NJ','07834','973-491-8723','catarina_gleich@hotmail.com','http://www.terkroberteesq.com',9,'US'),
('Virgie','Kiel','Cullen, Terrence P Esq','76598 Rd  I 95 #1','Denver','CO',80216,'303-845-5408','vkiel@hotmail.com','http://www.cullenterrencepesq.com',7,'US'),
('Jolene','Ostolaza','Central Die Casting Mfg Co Inc','1610 14th St Nw','Newport News','VA',23608,'757-940-1741','jolene@yahoo.com','http://www.centraldiecastingmfgcoinc.com',1,'US'),
('Keneth','Borgman','Centerline Engineering','86350 Roszel Rd','Phoenix','AZ',85012,'602-442-3092','keneth@yahoo.com','http://www.centerlineengineering.com',7,'US'),
('Rikki','Nayar','Targan & Kievit Pa','1644 Clove Rd','Miami','FL',33155,'305-978-2069','rikki@nayar.com','http://www.targankievitpa.com',7,'US'),
('Elke','Sengbusch','Riley Riper Hollin & Colagreco','9 W Central Ave','Phoenix','AZ',85013,'602-575-3457','elke_sengbusch@yahoo.com','http://www.rileyriperhollincolagreco.com',5,'US'),
('Hoa','Sarao','Kaplan, Joel S Esq','27846 Lafayette Ave','Oak Hill','FL',32759,'386-599-7296','hoa@sarao.org','http://www.kaplanjoelsesq.com',7,'US'),
('Trinidad','Mcrae','Water Office','10276 Brooks St','San Francisco','CA',94105,'415-419-1597','trinidad_mcrae@yahoo.com','http://www.wateroffice.com',6,'US'),
('Mari','Lueckenbach','Westbrooks, Nelson E Jr','1 Century Park E','San Diego','CA',92110,'858-228-5683','mari_lueckenbach@yahoo.com','http://www.westbrooksnelsonejr.com',1,'US'),
('Selma','Husser','Armon Communications','9 State Highway 57 #22','Jersey City','NJ','07306','201-772-7699','selma.husser@cox.net','http://www.armoncommunications.com',6,'US'),
('Antione','Onofrio','Jacobs & Gerber Inc','4 S Washington Ave','San Bernardino','CA',92410,'909-665-3223','aonofrio@onofrio.com','http://www.jacobsgerberinc.com',7,'US'),
('Luisa','Jurney','Forest Fire Laboratory','25 Se 176th Pl','Cambridge','MA','02138','617-544-2541','ljurney@hotmail.com','http://www.forestfirelaboratory.com',7,'US'),
('Clorinda','Heimann','Haughey, Charles Jr','105 Richmond Valley Rd','Escondido','CA',92025,'760-261-4786','clorinda.heimann@hotmail.com','http://www.haugheycharlesjr.com',1,'US'),
('Dick','Wenzinger','Wheaton Plastic Products','22 Spruce St #595','Gardena','CA',90248,'310-936-2258','dick@yahoo.com','http://www.wheatonplasticproducts.com',4,'US'),
('Ahmed','Angalich','Reese Plastics','2 W Beverly Blvd','Harrisburg','PA',17110,'717-632-5831','ahmed.angalich@angalich.com','http://www.reeseplastics.com',7,'US'),
('Iluminada','Ohms','Nazette Marner Good Wendt','72 Southern Blvd','Mesa','AZ',85204,'480-866-6544','iluminada.ohms@yahoo.com','http://www.nazettemarnergoodwendt.com',1,'US'),
('Joanna','Leinenbach','Levinson Axelrod Wheaton','1 Washington St','Lake Worth','FL',33461,'561-951-9734','joanna_leinenbach@hotmail.com','http://www.levinsonaxelrodwheaton.com',7,'US'),
('Caprice','Suell','Egnor, W Dan Esq','90177 N 55th Ave','Nashville','TN',37211,'615-726-4537','caprice@aol.com','http://www.egnorwdanesq.com',7,'US'),
('Stephane','Myricks','Portland Central Thriftlodge','9 Tower Ave','Burlington','KY',41005,'859-308-4286','stephane_myricks@cox.net','http://www.portlandcentralthriftlodge.com',1,'US'),
('Quentin','Swayze','Ulbrich Trucking','278 Bayview Ave','Milan','MI',48160,'734-851-8571','quentin_swayze@yahoo.com','http://www.ulbrichtrucking.com',1,'US'),
('Annmarie','Castros','Tipiak Inc','80312 W 32nd St','Conroe','TX',77301,'936-937-2334','annmarie_castros@gmail.com','http://www.tipiakinc.com',5,'US'),
('Shonda','Greenbush','Saint George Well Drilling','82 Us Highway 46','Clifton','NJ','07011','973-644-2974','shonda_greenbush@cox.net','http://www.saintgeorgewelldrilling.com',1,'US'),
('Cecil','Lapage','Hawkes, Douglas D','4 Stovall St #72','Union City','NJ','07087','201-856-2720','clapage@lapage.com','http://www.hawkesdouglasd.com',6,'US'),
('Jeanice','Claucherty','Accurel Systems Intrntl Corp','19 Amboy Ave','Miami','FL',33142,'305-306-7834','jeanice.claucherty@yahoo.com','http://www.accurelsystemsintrntlcorp.com',1,'US'),
('Josphine','Villanueva','Santa Cruz Community Internet','63 Smith Ln #8343','Moss','TN',38575,'931-486-6946','josphine_villanueva@villanueva.com','http://www.santacruzcommunityinternet.com',1,'US'),
('Daniel','Perruzza','Gersh & Danielson','11360 S Halsted St','Santa Ana','CA',92705,'714-531-1391','dperruzza@perruzza.com','http://www.gershdanielson.com',9,'US'),
('Cassi','Wildfong','Cobb, James O Esq','26849 Jefferson Hwy','Rolling Meadows','IL',60008,'847-755-9041','cassi.wildfong@aol.com','http://www.cobbjamesoesq.com',1,'US'),
('Britt','Galam','Wheatley Trucking Company','2500 Pringle Rd Se #508','Hatfield','PA',19440,'215-351-8523','britt@galam.org','http://www.wheatleytruckingcompany.com',9,'US'),
('Adell','Lipkin','Systems Graph Inc Ab Dick Dlr','65 Mountain View Dr','Whippany','NJ','07981','973-662-8988','adell.lipkin@lipkin.com','http://www.systemsgraphincabdickdlr.com',1,'US'),
('Jacqueline','Rowling','John Hancock Mutl Life Ins Co','1 N San Saba','Erie','PA',16501,'814-481-1700','jacqueline.rowling@yahoo.com','http://www.johnhancockmutllifeinsco.com',5,'US'),
('Lonny','Weglarz','History Division Of State','51120 State Route 18','Salt Lake City','UT',84115,'801-892-8781','lonny_weglarz@gmail.com','http://www.historydivisionofstate.com',7,'US'),
('Lonna','Diestel','Dimmock, Thomas J Esq','1482 College Ave','Fayetteville','NC',28301,'910-200-7912','lonna_diestel@gmail.com','http://www.dimmockthomasjesq.com',1,'US'),
('Cristal','Samara','Intermed Inc','4119 Metropolitan Dr','Los Angeles','CA',90021,'213-696-8004','cristal@cox.net','http://www.intermedinc.com',1,'US'),
('Kenneth','Grenet','Bank Of New York','2167 Sierra Rd','East Lansing','MI',48823,'517-867-8077','kenneth.grenet@grenet.org','http://www.bankofnewyork.com',6,'US'),
('Elli','Mclaird','Sportmaster Intrnatl','6 Sunrise Ave','Utica','NY',13501,'315-474-5570','emclaird@mclaird.com','http://www.sportmasterintrnatl.com',7,'US'),
('Alline','Jeanty','W W John Holden Inc','55713 Lake City Hwy','South Bend','IN',46601,'574-405-1983','ajeanty@gmail.com','http://www.wwjohnholdeninc.com',1,'US'),
('Sharika','Eanes','Maccani & Delp','75698 N Fiesta Blvd','Orlando','FL',32806,'407-472-1332','sharika.eanes@aol.com','http://www.maccanidelp.com',7,'US'),
('Nu','Mcnease','Amazonia Film Project','88 Sw 28th Ter','Harrison','NJ','07029','973-903-4175','nu@gmail.com','http://www.amazoniafilmproject.com',1,'US'),
('Daniela','Comnick','Water & Sewer Department','7 Flowers Rd #403','Trenton','NJ','08611','609-398-2805','dcomnick@cox.net','http://www.watersewerdepartment.com',7,'US'),
('Cecilia','Colaizzo','Switchcraft Inc','4 Nw 12th St #3849','Madison','WI',53717,'608-302-3387','cecilia_colaizzo@colaizzo.com','http://www.switchcraftinc.com',1,'US'),
('Leslie','Threets','C W D C Metal Fabricators','2 A Kelley Dr','Katonah','NY',10536,'914-396-2615','leslie@cox.net','http://www.cwdcmetalfabricators.com',7,'US'),
('Nan','Koppinger','Shimotani, Grace T','88827 Frankford Ave','Greensboro','NC',27401,'336-564-1492','nan@koppinger.com','http://www.shimotanigracet.com',6,'US'),
('Izetta','Dewar','Lisatoni, Jean Esq','2 W Scyene Rd #3','Baltimore','MD',21217,'410-522-7621','idewar@dewar.com','http://www.lisatonijeanesq.com',1,'US'),
('Tegan','Arceo','Ceramic Tile Sales Inc','62260 Park Stre','Monroe Township','NJ','08831','732-705-6719','tegan.arceo@arceo.org','http://www.ceramictilesalesinc.com',7,'US'),
('Ruthann','Keener','Maiden Craft Inc','3424 29th St Se','Kerrville','TX',78028,'830-919-5991','ruthann@hotmail.com','http://www.maidencraftinc.com',6,'US'),
('Joni','Breland','Carriage House Cllsn Rpr Inc','35 E Main St #43','Elk Grove Village','IL',60007,'847-740-5304','joni_breland@cox.net','http://www.carriagehousecllsnrprinc.com',1,'US'),
('Vi','Rentfro','Video Workshop','7163 W Clark Rd','Freehold','NJ','07728','732-724-7251','vrentfro@cox.net','http://www.videoworkshop.com',1,'US'),
('Colette','Kardas','Fresno Tile Center Inc','21575 S Apple Creek Rd','Omaha','NE',68124,'402-707-1602','colette.kardas@yahoo.com','http://www.fresnotilecenterinc.com',7,'US'),
('Malcolm','Tromblay','Versatile Sash & Woodwork','747 Leonis Blvd','Annandale','VA',22003,'703-874-4248','malcolm_tromblay@cox.net','http://www.versatilesashwoodwork.com',1,'US'),
('Ryan','Harnos','Warner Electric Brk & Cltch Co','13 Gunnison St','Plano','TX',75075,'972-961-4968','ryan@cox.net','http://www.warnerelectricbrkcltchco.com',6,'US'),
('Jess','Chaffins','New York Public Library','18 3rd Ave','New York','NY',10016,'212-428-9538','jess.chaffins@chaffins.org','http://www.newyorkpubliclibrary.com',1,'US'),
('Sharen','Bourbon','Mccaleb, John A Esq','62 W Austin St','Syosset','NY',11791,'516-749-3188','sbourbon@yahoo.com','http://www.mccalebjohnaesq.com',7,'US'),
('Nickolas','Juvera','United Oil Co Inc','177 S Rider Trl #52','Crystal River','FL',34429,'352-947-6152','nickolas_juvera@cox.net','http://www.unitedoilcoinc.com',6,'US'),
('Gary','Nunlee','Irving Foot Center','2 W Mount Royal Ave','Fortville','IN',46040,'317-887-8486','gary_nunlee@nunlee.org','http://www.irvingfootcenter.com',1,'US'),
('Diane','Devreese','Acme Supply Co','1953 Telegraph Rd','Saint Joseph','MO',64504,'816-329-5565','diane@cox.net','http://www.acmesupplyco.com',1,'US'),
('Roslyn','Chavous','Mcrae, James L','63517 Dupont St','Jackson','MS',39211,'601-973-5754','roslyn.chavous@chavous.org','http://www.mcraejamesl.com',1,'US'),
('Glory','Schieler','Mcgraths Seafood','5 E Truman Rd','Abilene','TX',79602,'325-740-3778','glory@yahoo.com','http://www.mcgrathsseafood.com',2,'US'),
('Rasheeda','Sayaphon','Kummerer, J Michael Esq','251 Park Ave #979','Saratoga','CA',95070,'408-997-7490','rasheeda@aol.com','http://www.kummererjmichaelesq.com',9,'US'),
('Alpha','Palaia','Stoffer, James M Jr','43496 Commercial Dr #29','Cherry Hill','NJ','08003','856-513-7024','alpha@yahoo.com','http://www.stofferjamesmjr.com',4,'US'),
('Refugia','Jacobos','North Central Fl Sfty Cncl','2184 Worth St','Hayward','CA',94545,'510-509-3496','refugia.jacobos@jacobos.com','http://www.northcentralflsftycncl.com',1,'US'),
('Shawnda','Yori','Fiorucci Foods Usa Inc','50126 N Plankinton Ave','Longwood','FL',32750,'407-564-8113','shawnda.yori@yahoo.com','http://www.fioruccifoodsusainc.com',6,'US'),
('Mona','Delasancha','Sign All','38773 Gravois Ave','Cheyenne','WY',82001,'307-816-7115','mdelasancha@hotmail.com','http://www.signall.com',6,'US'),
('Gilma','Liukko','Sammys Steak Den','16452 Greenwich St','Garden City','NY',11530,'516-407-9573','gilma_liukko@gmail.com','http://www.sammyssteakden.com',1,'US'),
('Janey','Gabisi','Dobscha, Stephen F Esq','40 Cambridge Ave','Madison','WI',53715,'608-586-6912','jgabisi@hotmail.com','http://www.dobschastephenfesq.com',6,'US'),
('Lili','Paskin','Morgan Custom Homes','20113 4th Ave E','Kearny','NJ','07032','201-478-8540','lili.paskin@cox.net','http://www.morgancustomhomes.com',6,'US'),
('Loren','Asar','Olsen Payne & Company','6 Ridgewood Center Dr','Old Forge','PA',18518,'570-569-2356','loren.asar@aol.com','http://www.olsenpaynecompany.com',3,'US'),
('Dorothy','Chesterfield','Cowan & Kelly','469 Outwater Ln','San Diego','CA',92126,'858-732-1884','dorothy@cox.net','http://www.cowankelly.com',1,'US'),
('Gail','Similton','Johnson, Wes Esq','62 Monroe St','Thousand Palms','CA',92276,'760-493-9208','gail_similton@similton.com','http://www.johnsonwesesq.com',1,'US'),
('Catalina','Tillotson','Icn Pharmaceuticals Inc','3338 A Lockport Pl #6','Margate City','NJ','08402','609-826-4990','catalina@hotmail.com','http://www.icnpharmaceuticalsinc.com',6,'US'),
('Lawrence','Lorens','New England Sec Equip Co Inc','9 Hwy','Providence','RI','02906','401-893-1820','lawrence.lorens@hotmail.com','http://www.newenglandsecequipcoinc.com',1,'US'),
('Carlee','Boulter','Tippett, Troy M Ii','8284 Hart St','Abilene','KS',67410,'785-253-7049','carlee.boulter@hotmail.com','http://www.tippetttroymii.com',1,'US'),
('Thaddeus','Ankeny','Atc Contracting','5 Washington St #1','Roseville','CA',95678,'916-459-2433','tankeny@ankeny.org','http://www.atccontracting.com',1,'US'),
('Jovita','Oles','Pagano, Philip G Esq','8 S Haven St','Daytona Beach','FL',32114,'386-208-6976','joles@gmail.com','http://www.paganophilipgesq.com',7,'US'),
('Alesia','Hixenbaugh','Kwikprint','9 Front St','Washington','DC',20001,'202-276-6826','alesia_hixenbaugh@hixenbaugh.org','http://www.kwikprint.com',6,'US'),
('Lai','Harabedian','Buergi & Madden Scale','1933 Packer Ave #2','Novato','CA',94945,'415-926-6089','lai@gmail.com','http://www.buergimaddenscale.com',9,'US'),
('Brittni','Gillaspie','Inner Label','67 Rv Cent','Boise','ID',83709,'208-206-9848','bgillaspie@gillaspie.com','http://www.innerlabel.com',7,'US'),
('Raylene','Kampa','Hermar Inc','2 Sw Nyberg Rd','Elkhart','IN',46514,'574-330-1884','rkampa@kampa.org','http://www.hermarinc.com',6,'US'),
('Flo','Bookamer','Simonton Howe & Schneider Pc','89992 E 15th St','Alliance','NE',69301,'308-250-6987','flo.bookamer@cox.net','http://www.simontonhoweschneiderpc.com',6,'US'),
('Jani','Biddy','Warehouse Office & Paper Prod','61556 W 20th Ave','Seattle','WA',98104,'206-395-6284','jbiddy@yahoo.com','http://www.warehouseofficepaperprod.com',6,'US'),
('Chauncey','Motley','Affiliated With Travelodge','63 E Aurora Dr','Orlando','FL',32804,'407-557-8857','chauncey_motley@aol.com','http://www.affiliatedwithtravelodge.com',1,'US');

INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_amazon","url_bdfugue") VALUES
('Do Androids Dream Of Electric Sheep?',11,'Philip K Dick, Tony Parker',true,true,'1-6',6,6,1,NULL,'comics/androidssheep.jpg','https://smile.amazon.com/Androids-Dream-Electric-Sheep-Vol-ebook/dp/B01E0IR7G2','https://www.bdfugue.com/do-androids-dream-of-electric-sheep'),
('Saga',11,'Brian K. Vaughan and Fiona Staples',false,false,'1-5',5,6,1,NULL,'comics/saga1.jpg','https://smile.amazon.com/Saga-Book-One-Brian-Vaughan/dp/1632150786','https://www.bdfugue.com/saga-tome-1');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_bdfugue") VALUES
('Alim le Tanneur',5,'Wilfrid Lupano, Virginie Augustin',true,true,'1-4',4,4,2,NULL,'comics/alim1.jpg','https://www.bdfugue.com/alim-le-tanneur-t-1-le-secret-des-eaux');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('La Caste des Meta-Barons',11,'Alexandro Jodorowsky et Juan Gimenez',false,true,'1-5',5,8,2,NULL,'comics/metabaron1.jpg');
INSERT INTO "comics"("title","genre_id","have","have_nb","serie_nb","language_id","authors","complete","finished","notes","pix") VALUES
('Garulfo',7,'1-6',6,6,2,'Alain Ayroles et Bruno Maïorana',true,true,NULL,'comics/garulfo1.jpg');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('Lanfeust de Troy',5,'Didier Tarquin, Christophe Arleston',true,true,'1-8',8,8,2,NULL,'comics/lanfeust1.jpg'),
('Salammbo',4,'Philippe Druillet et Gustave Flaubert',true,true,'1-3',3,3,2,NULL,'comics/salammbo1.jpg');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_amazon","url_bdfugue") VALUES
('Carmen McCallum',11,'Fred Duval et Gess',false,false,'1-5',5,12,2,NULL,'comics/carmenmc1.jpg',NULL,'https://www.bdfugue.com/carmen-mc-callum-t-1-jukurpa');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('Code McCallum',11,'Fred Duval et Didier Cassegrain',true,true,'5',5,5,2,NULL,'comics/codemc1.jpg');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_bdfugue") VALUES
('La Nef des Fous',8,'Turf',true,true,'1-7',7,7,2,NULL,'comics/neffous1.jpg','https://www.bdfugue.com/la-nef-des-fous-t-1-eauxfolles');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_amazon","url_bdfugue") VALUES
('La Quete de l''Oiseau du Temps',5,'Serge Le Tendre et Régis Loisel',true,true,'1-4',4,4,2,NULL,'comics/quete1.jpg',NULL,NULL);
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('Le Lama Blanc',1,'Alejandro Jodorowsky et Georges Bess',true,true,'1-6',6,6,2,NULL,'comics/lama1.jpg'),
('Le Surfer d''Argent',12,'Moebius, Stan Lee',true,true,'1',1,1,2,NULL,'comics/surfer.jpg');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_amazon","url_bdfugue") VALUES
('L''Incal',11,'Moebius et Alexandro Jodorowsky',true,true,'1-6',6,6,2,NULL,'comics/incal1.jpg','https://smile.amazon.com/Incal-Vol-Black-ebook/dp/B00SVE70MI/','https://www.bdfugue.com/l-incal-t-1-l-incal-noir-29999');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('Sky Doll',4,'Alessandro Barbucci et Barbara Canepa',true,true,'1-3',3,3,2,NULL,'comics/skydoll1.jpg');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_amazon") VALUES
('Ronin',11,'Franck Miller',true,true,'1',1,1,1,NULL,'comics/ronin.jpg','https://smile.amazon.com/Ronin-Deluxe-Frank-Miller-ebook/dp/B00MV1NZ94');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix","url_bdfugue") VALUES
('Le Fleau des Dieux',11,'Valérie Mangin et Aleksa Gajic',true,true,'1-6',6,6,2,NULL,'comics/fleaudieux1.jpg','https://www.bdfugue.com/le-fleau-des-dieux-t-1-morituri-te-saluant-82834');
INSERT INTO "comics"("title","genre_id","authors","complete","finished","have","have_nb","serie_nb","language_id","notes","pix") VALUES
('Tales of an Imperfect Future',11,'Alfonso Font',true,true,'1',1,1,1,NULL,'comics/imperfect-future.jpg'),
('Ghost in the Shell',11,'Masamune Shirow',false,true,'1',1,2,1,NULL,'comics/ghost-in-the-shell.jpg');

INSERT INTO "restaurant"(id,"name","cuisine_id","price_id","web","yelp","notes","favorite","phone","address","city","state","zip") VALUES
(1,'Atelier Crenn',1,4,'https://www.ateliercrenn.com','https://www.yelp.com/biz/atelier-crenn-san-francisco',NULL,NULL,'(415) 440-0460','3127 Fillmore St','San Francisco','CA',94123),
(2,'Ben Tre',2,2,'https://bentrerestaurant.com/','https://www.yelp.com/biz/ben-tre-vietnamese-homestyle-cuisine-san-mateo',NULL,NULL,'650) 558-8088','213 2nd Ave','San Mateo','CA',94401),
(3,'Chapeau',1,3,'https://www.chapeausf.com/','https://www.yelp.com/biz/chapeau-san-francisco',NULL,NULL,'(415) 750-9787','126 Clement St','San Francisco','CA',94118),
(4,'Hunan Village',3,1,NULL,'https://www.yelp.com/biz/hunan-village-oakland',NULL,'Crispy chicken','(510) 465-4629','3232 Grand Ave','Oakland','CA',94610),
(5,'L’Ardoise Bistro',1,3,'http://www.ardoisesf.com/','https://www.yelp.com/biz/l-ardoise-bistro-san-francisco',NULL,NULL,'(415) 437-2600','151 Noe St','San Francisco','CA',94114),
(6,'Mathilde French Bistro',1,3,'https://www.mathildesf.com/','https://www.yelp.com/biz/mathilde-french-bistro-san-francisco',NULL,NULL,'(415) 546-6128','315 5th St','San Francisco','CA',94107),
(7,'PPQ Dungeness Island',2,2,'http://www.ppqcrab.com','https://www.yelp.com/biz/ppq-dungeness-island-san-francisco-2',NULL,'Crab w/ Garlic Noodles.','(415) 386-8266','2332 Clement St','San Francisco','CA',94121),
(8,'Thep Phanom',6,2,NULL,'https://www.yelp.com/biz/thep-phanom-thai-restaurant-san-francisco-2',NULL,'Crispy duck w. plum sauce.','(415) 431-2526','400 Waller St','San Francisco','CA',94117),
(9,'Ton Kiang',3,2,NULL,'https://www.yelp.com/biz/ton-kiang-san-francisco',NULL,'Dim sum','(415) 752-4440','5821 Geary Blvd','San Francisco','CA',94121),
(10,'Gao Viet Kitchen',2,3,'https://gaokitchen.com/','https://www.yelp.com/biz/gao-viet-kitchen-san-mateo-5',NULL,NULL,'(650) 477-2524','313 S San Mateo Dr','San Mateo','CA',94401),
(11,'The Slanted Door',2,3,'http://www.slanteddoor.com/','https://www.yelp.com/biz/the-slanted-door-san-francisco',NULL,NULL,'(415) 861-8032','1 Ferry Bldg
Ste 3','San Francisco','CA',94111);

ALTER SEQUENCE "restaurant_id_seq" RESTART WITH 12;

INSERT INTO "wine"(id,"name","label_img","vintage","winery","bsize_id","type_id","price","grape_id","country_id","region","buying_date","value","purchased","remaining","drink_from","drink_to","peak_from","peak_to") VALUES
(1,'Macrostie','wine/macrostie.png',2008,'Mc Williams',1,1,20,1,18,'Sonoma','2022-05-12',24,24,16,2022,2020,2023,2025);
INSERT INTO "wine"(id,"name","label_img","vintage","winery","bsize_id","type_id","grape_id","buying_date","price","value","drink_from","drink_to","purchased","remaining","country_id","region","area","score_parker","score_winespectator") VALUES
(2,'Château d''Yquem','wine/yquem.png',2016,'Lur Saluces',1,2,59,'2021-12-12',399,460,2016,2030,3,1,7,'Bordeaux','Sauternes and Barsac',92,94);
INSERT INTO "wine"(id,"name","label_img","vintage","winery","bsize_id","type_id","price","value","buying_date","purchased","remaining","drink_from","grape_id","country_id","score_parker","score_winespectator") VALUES
(3,'Château St Jean','wine/stjean.png',2015,'Ch St Jean',1,1,34,42,'2019-12-12',12,5,2020,2,7,68,72);
INSERT INTO "wine"(id,"name","label_img","vintage","winery","bsize_id","type_id","buying_date","price","value","drink_from","grape_id","country_id","score_parker","score_winespectator") VALUES
(4,'Vine Cliff','wine/vinecliff.png',2016,'Vine Cliff',1,1,'2021-12-05',28,28,2018,3,18,67,62);
INSERT INTO "wine"(id,"name","label_img","vintage","winery","bsize_id","grape_id","type_id","drink_from","buying_date","region","price","value","purchased","remaining","country_id","score_parker","score_winespectator") VALUES
(5,'Château Montelena','wine/montelena.png',2020,'Château Montelena',4,3,1,2022,'2023-10-05','California',62,32,12,8,18,64,64);

ALTER SEQUENCE "wine_id_seq" RESTART WITH 6;

INSERT INTO "wine_tasting"("wine_id","drink_date","robe","nose","taste","notes") VALUES
(1,'2021-05-08','light','fruity','fruity','too young'),
(1,'2021-07-10','light','light fruit',NULL,NULL),
(1,'2022-01-10','light','light fruit','fruity',NULL),
(1,'2023-04-23','light','light fruit',NULL,'Great');
INSERT INTO "wine_tasting"("wine_id","drink_date","robe","nose","taste") VALUES
(2,'2021-04-23','golden','fruity','incredible'),
(2,'2022-05-12','clear','strong and sweet','outstanding'),
(2,'2023-07-02','clear','strong and sweet','outstanding');
INSERT INTO "wine_tasting"("wine_id","drink_date","robe","nose","taste","notes") VALUES
(3,'2022-01-12','thick','strong','good','Great w/ beef.');
INSERT INTO "wine_tasting"("wine_id","drink_date","robe","nose","taste") VALUES
(4,'2021-05-05','light','strong','good'),
(4,'2022-08-05','light','strong','good'),
(4,'2022-08-18','light','strong','ok'),
(4,'2023-05-15','light','strong','ok');
INSERT INTO "wine_tasting"("wine_id","drink_date","nose","taste") VALUES
(5,'2022-05-05','strong+','excellent');
INSERT INTO "wine_tasting"("wine_id","drink_date","robe","nose","taste") VALUES
(5,'2022-10-22','rich','strong','very good'),
(5,'2023-02-02','rich','strong','very good');

INSERT INTO "music_album"(id,"title","artist_id","url","cover","length","description") VALUES
(1,'The Essential Snatam Kaur: Sacred Chants For Healing',1,'https://www.amazon.com/Essential-Snatam-Kaur-Sacred-Chants/dp/B003BWQE1S/','music/snatamkaur-sacredchants.jpg','73:05','From one of the most recognized voices in the world of sacred chant comes a heartfelt collection of music for the soul: The Essential Snatam Kaur. Immersed in the kundalini tradition since birth, Snatam—who has sold more than 350,000 records to date—has toured the world offering inspiring and uplifting music to sold-out crowds. With a gift for transforming Gurmukhi mantras and Eastern traditional chants into contemporary sound that appeals to a wide variety of listeners, Snatam takes us on an inner journey through her favorite selections for healing, strength, and peace.'),
(2,'Beloved',1,'https://www.amazon.com/Beloved-Snatam-Kaur/dp/B079LZ8W6K','music/snatamkaur-beloved.jpg','71:24','A love song to the heart of exquisite depth and lyrical sensitivity, featuring angelic vocals of unparalleled beauty and the transcendent sound of crystal singing bowls; tender, gentle, uplifting, divinely inspired healing music.'),
(3,'Beloved',2,'https://www.amazon.com/Beloved-Ashana/dp/B001JTTYVW','music/ashana-beloved.jpg','60:23','Beloved is a love song to the heart. Tender, joyful, gentle, and breathtakingly beautiful, the music of Beloved is a healing balm for the soul that will lift your spirit and carry you on waves of love into the arms of the Divine./n/nFeaturing Ashana''s stunning angelic vocals and the luminous sound of crystal singing bowls, the songs on Beloved reflect a deep sense of compassion, vulnerability and lyrical sensitivity. Heard on this album is one of the most hauntingly beautiful interpretations ever to be recorded of the Lord''s Prayer, sung in Aramaic, and an exquisite rendition of the Gaelic prayer, "Deep Peace".'),
(4,'Lovers Rock',3,'https://smile.amazon.com/Lovers-Rock-Sade/dp/B00JRBGE62','music/sade-loversrock.jpg','44:10','Lovers Rock is the fifth studio album by English band Sade. It was released on 13 November 2000 by Epic Records. The album was titled after a style of reggae music known as lovers rock, noted for its romantic sound and content, which frontwoman Sade Adu listened to in her youth. Lovers Rock was seen as a departure from the band''s previous use of jazz elements, opting instead for a wider use of musical elements from soul music, R&B, soft rock, folk music, dub, reggae and lovers rock. The album''s production has been characterised as spare, with simple arrangements and reggae flourishes. A concept album, the lyrics focus on both the positive and the negative sides of love; the album''s lyrical content also touches upon political themes.'),
(5,'Play',4,'https://www.amazon.com/Play-Moby/dp/B00000J6AG','music/moby-play.jpg','63:03','Play is the fifth studio album by American electronica musician Moby. It was released on May 17, 1999 by Mute and V2 Records. Recording of the album began in mid-1997, following the release of his fourth album, Animal Rights (1996), which deviated from Moby''s electronica style; his goal for Play was to return to this style of music. Originally intended to be his final record, the recording of the album took place at Moby''s home studio in Manhattan, New York.'),
(6,'18',4,'https://smile.amazon.com/18-Moby/dp/B000063S6Z','music/moby-18.jpg','71:24','18 is the sixth studio album by American electronica musician, songwriter, and producer Moby. It was released on May 13, 2002 by Mute Records in the UK and on May 14, 2002 by V2 Records in the US. After the unexpected commercial and critical success of his previous album, Play (1999), Moby started to write songs for a follow-up during its supporting tour. He started work on the album at its conclusion in December 2000, using less samples than before. Guest vocalists include Azure Ray, MC Lyte, Angie Stone, and Sinéad O''Connor.');
INSERT INTO "music_album"(id,"title","artist_id","cover","url","length","description") VALUES
(7,'Varanasi',5,'music/naid-varanasi.jpg','https://www.amazon.com/Varanasi-Naid/dp/B00130T6N8/','52:21','The songs in the album are all tamil devotional mantras sang with modern music, remixed by Naid.');

ALTER SEQUENCE "music_album_id_seq" RESTART WITH 8;

INSERT INTO "music_artist"(id,"name","bdate","photo","url","description") VALUES
(1,'Snatam Kaur','1972-06-19','music/snatam_kaur.jpg','https://www.snatamkaur.com/','Through inspirational concerts, workshops, immersion courses and retreats, the much-beloved devotional singer and Grammy nominated recording artist Snatam Kaur shares the power of Sikh sacred mantras with all the world. Possessed of an incandescently luminous voice and a deep knowledge of Kundalini yoga, her concerts and events are joyous occasions and a source of solace for our troubled times.');
INSERT INTO "music_artist"(id,"name","photo","url","description") VALUES
(2,'Ashana','music/ashana.jpg','https://www.soundofashana.com/','Weaving together soaring, angelic vocals and the celestial sound of crystal singing bowls, Ashana is one of the premiere healing music artists and New Age vocalists of our time. In fact, Ashana’s original sound is the forefront of an entirely new genre of healing music. This exquisitely crafted, luminous sonic tapestry soothes and opens the heart, enfolding the listener in a transcendent experience of the Divine and a direct experience of the Soul. This stunningly beautiful alchemy has been hailed by listeners all over the world as “breathtaking” and “a Gift from Heaven.”');
INSERT INTO "music_artist"(id,"name","bdate","photo","url","description") VALUES
(3,'Sade','1959-01-16','music/sade.jpg','https://www.sade.com/','Helen Folasade Adu, is a British singer, songwriter, and actress, known as the lead singer of her eponymous band. Sade is widely considered a musical influence, and her contributions to music have made her a global figure in popular culture for over two decades. She has been credited as one of the most successful British female artists in history.'),
(4,'Moby','1965-09-11','music/moby.jpg','http://moby.com','Richard Melville Hall (born September 11, 1965), better known as Moby, is an American musician, songwriter, singer, producer, and animal rights activist. He has sold 20 million records worldwide. AllMusic considers him to be "among the most important dance music figures of the early 1990s, helping bring dance music to a mainstream audience both in the United Kingdom and the United States".');
INSERT INTO "music_artist"(id,"name","photo","url","description") VALUES
(5,'Naid','music/naid-varanasi.jpg',NULL,'Martin Landquist is a Swedish music producer, recording artist, remixer and songwriter working under the name Nåid. He has produced albums for artists such as a-ha, Jay-Jay Johanson, Linda Sundblad and Kent, and has remixed tracks for artists including The Cardigans. ');

ALTER SEQUENCE "music_artist_id_seq" RESTART WITH 6;

INSERT INTO "music_track"("name","length","album_id","genre_id") VALUES
('Jap Man Sat Nam','11:08',1,7),
('Ek Ong Kaar','8:42',1,7),
('Servant of Peace','7:12',1,7),
('By Thy Grace','7:45',1,7),
('Gobinda Gobinda Hari Hari','10:47',1,7),
('Ong Namo','10:01',1,7),
('Ra Ma Da Sa','13:32',1,7),
('Long Time Sun','3:58',1,7),
('Amul - Priceless','7:04',2,7),
('Gopaal','8:04',2,7),
('Water of Your Love','4:58',2,7),
('Har Uplift','8:32',2,7),
('Darashan Maago','12:55',2,7),
('Pooran Jot - Pure Light','9:10',2,7),
('Har Har Har Har Gobinday','12:03',2,7),
('Sat Naaraa-In','8:32',2,7),
('You Are My Breath','7:39',3,7),
('The Aramaic Lord''s Prayer','10:09',3,7),
('Dona Nobis Pacem','8:23',3,7),
('Opening to Love','8:43',3,7),
('Only You in My Heart','9:28',3,7),
('Deep Peace','8:55',3,7),
('Alleluia - Wahe Guru','7:06',3,7),
('By Your Side','4:34',4,9),
('Flow','4:34',4,9),
('King of Sorrow','4:52',4,9),
('Somebody Already Broke My Heart','5:01',4,9),
('All About Our Love','2:40',4,9),
('Slave Song','4:12',4,9),
('The Sweetest Gift','2:18',4,9),
('Every Word','4:04',4,9);
INSERT INTO "music_track"("name","length","album_id","genre_id","description") VALUES
('Immigrant','3:48',4,9,'Adu - Janusz Podrazik');
INSERT INTO "music_track"("name","length","album_id","genre_id") VALUES
('Lovers Rock','4:13',4,9);
INSERT INTO "music_track"("name","length","album_id","genre_id","description") VALUES
('It''s Only Love That Gets You Through','3:53',4,9,'Adu - Podrazik'),
('Honey','3:27',5,4,'Moby, Bessie Jones, Alan Lomax'),
('Find My Baby','3:58',5,4,'Moby, Willie Jones, Lomax');
INSERT INTO "music_track"("name","length","album_id","genre_id") VALUES
('Porcelain','4:01',5,4),
('Why Does My Heart Feel So Bad?','4:23',5,4),
('South Side','3:48',5,4),
('Rushing','2:58',5,4);
INSERT INTO "music_track"("name","length","album_id","genre_id","description") VALUES
('Bodyrock','3:34',5,4,'Moby, Gabriel Jackson, Bobby Robinson'),
('Natural Blues','4:12',5,4,'Moby, Vera Hall, Lomax');
INSERT INTO "music_track"("name","length","album_id","genre_id") VALUES
('Machete','3:36',5,4);
INSERT INTO "music_track"("name","album_id","genre_id") VALUES
('7',5,4),
('Run On',5,4),
('Down Slow',5,4),
('If Things Were Perfect',5,4),
('Everloving',5,4),
('Inside',5,4);
INSERT INTO "music_track"("name","album_id") VALUES
('Guitar, Flute & String',5);
INSERT INTO "music_track"("name","album_id","genre_id") VALUES
('The Sky Is Broken',5,4),
('My Weakness',5,4);
INSERT INTO "music_track"("name","album_id","length","genre_id") VALUES
('We Are All Made of Stars',6,'4:32',4),
('In This World',6,'4:02',4);
INSERT INTO "music_track"("name","album_id","genre_id","length") VALUES
('In My Heart',6,4,'4:36');
INSERT INTO "music_track"("name","album_id","genre_id","length","description") VALUES
('Great Escape',6,4,'2:09','Moby, Maria Taylor, Orenda Fink');
INSERT INTO "music_track"("name","album_id","genre_id","length") VALUES
('Signs of Love',6,4,'4:25'),
('One of These Mornings',6,4,'3:12'),
('Another Woman',6,4,'3:56'),
('Fireworks',6,4,'2:13'),
('Extreme Ways',6,4,'3:57'),
('Jam for the Ladies',6,4,'3:22'),
('Sunday (The Day Before My Birthday)',6,4,'5:09'),
('18',6,4,'4:28'),
('Sleep Alone',6,4,'4:45'),
('At Least We Tried',6,4,'4:08'),
('Harbour',6,4,'6:27'),
('Look Back In',6,4,'2:20'),
('The Rafters',6,4,'3:22'),
('I''m Not Worried at All',6,4,'4:11');
INSERT INTO "music_track"("name","length","album_id","genre_id") VALUES
('Varanasi','4:08',7,4),
('Aigiri Nam','5:42',7,4),
('Sarvesham','5:24',7,4),
('Mantra','5:53',7,4),
('Dakshina','6:48',7,4),
('Gothenburg','6:58',7,4),
('Diosas','4:21',7,4),
('Mangalam','4:30',7,4),
('Calling Aslak','4:36',7,4),
('Ganesha','4:01',7,4);
