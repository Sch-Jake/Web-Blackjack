-- blackjackdatabase.sql 
-- this file contains the sql commands used to create and fill up
-- the blackjack database

create database Schouten_BlackJack
use Schouten_BlackJack
---- USEFULL QUERIES
select * from loginData where user = 'admin' and pass = 'password';
-- returns TRUE if there exists a user with name admin and pass password
select case when exists (select * from loginData where user = 'admin' and pass = 'password') then 'TRUE' else 'FALSE' end;
--create new login data
insert into loginData ( user, pass) values ( 'jake', 'jake');
--check if table contains value 
SELECT count(*) FROM loginData WHERE user = 'jake'
--grab purse value for a user
select purse from loginData where user = "admin";
--update purse in the database
 update loginData set purse = 1000 where user = "admin";
 --find ideal move from hard book database
 select idealMove from hardBookData where id = "1008";
 -- top 10 purses 
select user, purse from loginData order by purse desc limit 5;
--grab max id from loginData
select MAX(id) from loginData;
-- update a user purse based on id
update loginData set purse = 500 where id = 3;
--find total purse value 
 select sum(purse) as total_purse_sum from ( 
    select purse from loginData union all select purse from bankData
    ) as combined_Results;
-- Create tables with an integer id for each table
create table hardBookData (
    id integer primary key,
    dealer integer,
    player integer,
    idealMove varchar(10)
);

create table softBookData (
    id integer primary key,
    dealer integer,
    player integer,
    idealMove varchar(10)
);

create table splitBookData (
    id integer primary key,
    dealer integer,
    player integer,
    idealMove varchar(10)

);
create table playerData (
    user varchar(10),
    dealer integer,
    player integer,
    wins integer,
    hands integer
);

create table bankData (
    name varchar(10),
    purse integer
);

create table loginData (
    id integer NOT NULL AUTO_INCREMENT primary key,
    user varchar(10),
    pass varchar(10),
    purse integer
);
insert into bankData values  ("bank", 1000000);
insert into loginData values
    ( "admin", "password");
insert into hardBookData values

    (0204, 02, 04, "hit"),
    (0304, 03, 04, "hit"),
    (0404, 04, 04, "hit"),
    (0504, 05, 04, "hit"),
    (0604, 06, 04, "hit"),
    (0704, 07, 04, "hit"),
    (0804, 08, 04, "hit"),
    (0904, 09, 04, "hit"),
    (1004, 10, 04, "hit"),
    (1104, 11, 04, "hit"),

    (0205, 02, 05, "hit"),
    (0305, 03, 05, "hit"),
    (0405, 04, 05, "hit"),
    (0505, 05, 05, "hit"),
    (0605, 06, 05, "hit"),
    (0705, 07, 05, "hit"),
    (0805, 08, 05, "hit"),
    (0905, 09, 05, "hit"),
    (1005, 10, 05, "hit"),
    (1105, 11, 05, "hit"),

    (0206, 02, 06, "hit"),
    (0306, 03, 06, "hit"),
    (0406, 04, 06, "hit"),
    (0506, 05, 06, "hit"),
    (0606, 06, 06, "hit"),
    (0706, 07, 06, "hit"),
    (0806, 08, 06, "hit"),
    (0906, 09, 06, "hit"),
    (1006, 10, 06, "hit"),
    (1106, 11, 06, "hit"),

    (0207, 02, 07, "hit"),
    (0307, 03, 07, "hit"),
    (0407, 04, 07, "hit"),
    (0507, 05, 07, "hit"),
    (0607, 06, 07, "hit"),
    (0707, 07, 07, "hit"),
    (0807, 08, 07, "hit"),
    (0907, 09, 07, "hit"),
    (1007, 10, 07, "hit"),
    (1107, 11, 07, "hit"),

    (0208, 02, 08, "hit"),
    (0308, 03, 08, "hit"),
    (0408, 04, 08, "hit"),
    (0508, 05, 08, "hit"),
    (0608, 06, 08, "hit"),
    (0708, 07, 08, "hit"),
    (0808, 08, 08, "hit"),
    (0908, 09, 08, "hit"),
    (1008, 10, 08, "hit"),
    (1108, 11, 08, "hit"),

    (0209, 02, 09, "hit"),
    (0309, 03, 09, "double"),
    (0409, 04, 09, "double"),
    (0509, 05, 09, "double"),
    (0609, 06, 09, "double"),
    (0709, 07, 09, "hit"),
    (0809, 08, 09, "hit"),
    (0909, 09, 09, "hit"),
    (1009, 10, 09, "hit"),
    (1109, 11, 09, "hit"),

    (0210, 02, 10, "double"),
    (0310, 03, 10, "double"),
    (0410, 04, 10, "double"),
    (0510, 05, 10, "double"),
    (0610, 06, 10, "double"),
    (0710, 07, 10, "double"),
    (0810, 08, 10, "double"),
    (0910, 09, 10, "double"),
    (1010, 10, 10, "hit"),
    (1110, 11, 10, "hit"),

    (0211, 02, 11, "double"),
    (0311, 03, 11, "double"),
    (0411, 04, 11, "double"),
    (0511, 05, 11, "double"),
    (0611, 06, 11, "double"),
    (0711, 07, 11, "double"),
    (0811, 08, 11, "double"),
    (0911, 09, 11, "double"),
    (1011, 10, 11, "double"),
    (1111, 11, 11, "double"),

    (0212, 02, 12, "hit"),
    (0312, 03, 12, "hit"),
    (0412, 04, 12, "stand"),
    (0512, 05, 12, "stand"),
    (0612, 06, 12, "stand"),
    (0712, 07, 12, "hit"),
    (0812, 08, 12, "hit"),
    (0912, 09, 12, "hit"),
    (1012, 10, 12, "hit"),
    (1112, 11, 12, "hit"),

    (0213, 02, 13, "stand"),
    (0313, 03, 13, "stand"),
    (0413, 04, 13, "stand"),
    (0513, 05, 13, "stand"),
    (0613, 06, 13, "stand"),
    (0713, 07, 13, "hit"),
    (0813, 08, 13, "hit"),
    (0913, 09, 13, "hit"),
    (1013, 10, 13, "hit"),
    (1113, 11, 13, "hit"),

    (0214, 02, 14, "stand"),
    (0314, 03, 14, "stand"),
    (0414, 04, 14, "stand"),
    (0514, 05, 14, "stand"),
    (0614, 06, 14, "stand"),
    (0714, 07, 14, "hit"),
    (0814, 08, 14, "hit"),
    (0914, 09, 14, "hit"),
    (1014, 10, 14, "hit"),
    (1114, 11, 14, "hit"),

    (0215, 02, 15, "stand"),
    (0315, 03, 15, "stand"),
    (0415, 04, 15, "stand"),
    (0515, 05, 15, "stand"),
    (0615, 06, 15, "stand"),
    (0715, 07, 15, "hit"),
    (0815, 08, 15, "hit"),
    (0915, 09, 15, "hit"),
    (1015, 10, 15, "hit"),
    (1115, 11, 15, "hit"),

    (0216, 02, 16, "stand"),
    (0316, 03, 16, "stand"),
    (0416, 04, 16, "stand"),
    (0516, 05, 16, "stand"),
    (0616, 06, 16, "stand"),
    (0716, 07, 16, "hit"),
    (0816, 08, 16, "hit"),
    (0916, 09, 16, "hit"),
    (1016, 10, 16, "hit"),
    (1116, 11, 16, "hit"),

    (0217, 02, 17, "stand"),
    (0317, 03, 17, "stand"),
    (0417, 04, 17, "stand"),
    (0517, 05, 17, "stand"),
    (0617, 06, 17, "stand"),
    (0717, 07, 17, "stand"),
    (0817, 08, 17, "stand"),
    (0917, 09, 17, "stand"),
    (1017, 10, 17, "stand"),
    (1117, 11, 17, "stand"),

    (0218, 02, 18, "stand"),
    (0318, 03, 18, "stand"),
    (0418, 04, 18, "stand"),
    (0518, 05, 18, "stand"),
    (0618, 06, 18, "stand"),
    (0718, 07, 18, "stand"),
    (0818, 08, 18, "stand"),
    (0918, 09, 18, "stand"),
    (1018, 10, 18, "stand"),
    (1118, 11, 18, "stand"),

    (0219, 02, 19, "stand"),
    (0319, 03, 19, "stand"),
    (0419, 04, 19, "stand"),
    (0519, 05, 19, "stand"),
    (0619, 06, 19, "stand"),
    (0719, 07, 19, "stand"),
    (0819, 08, 19, "stand"),
    (0919, 09, 19, "stand"),
    (1019, 10, 19, "stand"),
    (1119, 11, 19, "stand"),

    (0220, 02, 20, "stand"),
    (0320, 03, 20, "stand"),
    (0420, 04, 20, "stand"),
    (0520, 05, 20, "stand"),
    (0620, 06, 20, "stand"),
    (0720, 07, 20, "stand"),
    (0820, 08, 20, "stand"),
    (0920, 09, 20, "stand"),
    (1020, 10, 20, "stand"),
    (1120, 11, 20, "stand");


insert into softBookData values
    (0213, 02, 13, "hit"),
    (0313, 03, 13, "hit"),
    (0413, 04, 13, "hit"),
    (0513, 05, 13, "double"),
    (0613, 06, 13, "double"),
    (0713, 07, 13, "hit"),
    (0813, 08, 13, "hit"),
    (0913, 09, 13, "hit"),
    (1013, 10, 13, "hit"),
    (1113, 11, 13, "hit"),

    (0214, 02, 14, "hit"),
    (0314, 03, 14, "hit"),
    (0414, 04, 14, "hit"),
    (0514, 05, 14, "double"),
    (0614, 06, 14, "double"),
    (0714, 07, 14, "hit"),
    (0814, 08, 14, "hit"),
    (0914, 09, 14, "hit"),
    (1014, 10, 14, "hit"),
    (1114, 11, 14, "hit"),

    (0215, 02, 15, "hit"),
    (0315, 03, 15, "hit"),
    (0415, 04, 15, "double"),
    (0515, 05, 15, "double"),
    (0615, 06, 15, "double"),
    (0715, 07, 15, "hit"),
    (0815, 08, 15, "hit"),
    (0915, 09, 15, "hit"),
    (1015, 10, 15, "hit"),
    (1115, 11, 15, "hit"),

    (0216, 02, 16, "hit"),
    (0316, 03, 16, "hit"),
    (0416, 04, 16, "double"),
    (0516, 05, 16, "double"),
    (0616, 06, 16, "double"),
    (0716, 07, 16, "hit"),
    (0816, 08, 16, "hit"),
    (0916, 09, 16, "hit"),
    (1016, 10, 16, "hit"),
    (1116, 11, 16, "hit"),

    (0217, 02, 17, "hit"),
    (0317, 03, 17, "double"),
    (0417, 04, 17, "double"),
    (0517, 05, 17, "double"),
    (0617, 06, 17, "double"),
    (0717, 07, 17, "stand"),
    (0817, 08, 17, "stand"),
    (0917, 09, 17, "stand"),
    (1017, 10, 17, "stand"),
    (1117, 11, 17, "stand"),

    (0218, 02, 18, "double"),
    (0318, 03, 18, "double"),
    (0418, 04, 18, "double"),
    (0518, 05, 18, "double"),
    (0618, 06, 18, "double"),
    (0718, 07, 18, "stand"),
    (0818, 08, 18, "stand"),
    (0918, 09, 18, "hit"),
    (1018, 10, 18, "hit"),
    (1118, 11, 18, "hit"),

    (0219, 02, 19, "stand"),
    (0319, 03, 19, "stand"),
    (0419, 04, 19, "stand"),
    (0519, 05, 19, "stand"),
    (0619, 06, 19, "double"),
    (0719, 07, 19, "stand"),
    (0819, 08, 19, "stand"),
    (0919, 09, 19, "stand"),
    (1019, 10, 19, "stand"),
    (1119, 11, 19, "stand"),

    (0220, 02, 20, "stand"),
    (0320, 03, 20, "stand"),
    (0420, 04, 20, "stand"),
    (0520, 05, 20, "stand"),
    (0620, 06, 20, "stand"),
    (0720, 07, 20, "stand"),
    (0820, 08, 20, "stand"),
    (0920, 09, 20, "stand"),
    (1020, 10, 20, "stand"),
    (1120, 11, 20, "stand");


insert into splitBookData values

    (0222, 02, 22, "split"),
    (0322, 03, 22, "split"),
    (0422, 04, 22, "split"),
    (0522, 05, 22, "split"),
    (0622, 06, 22, "split"),
    (0722, 07, 22, "split"),
    (0822, 08, 22, "hit"),
    (0922, 09, 22, "hit"),
    (1022, 10, 22, "hit"),
    (1122, 11, 22, "hit"),

    (0233, 02, 33, "split"),
    (0333, 03, 33, "split"),
    (0433, 04, 33, "split"),
    (0533, 05, 33, "split"),
    (0633, 06, 33, "split"),
    (0733, 07, 33, "split"),
    (0833, 08, 33, "hit"),
    (0933, 09, 33, "hit"),
    (1033, 10, 33, "hit"),
    (1133, 11, 33, "hit"),

    (0244, 02, 44, "hit"),
    (0344, 03, 44, "hit"),
    (0444, 04, 44, "hit"),
    (0544, 05, 44, "split"),
    (0644, 06, 44, "split"),
    (0744, 07, 44, "hit"),
    (0844, 08, 44, "hit"),
    (0944, 09, 44, "hit"),
    (1044, 10, 44, "hit"),
    (1144, 11, 44, "hit"),

    (0266, 02, 66, "split"),
    (0366, 03, 66, "split"),
    (0466, 04, 66, "split"),
    (0566, 05, 66, "split"),
    (0666, 06, 66, "split"),
    (0766, 07, 66, "hit"),
    (0866, 08, 66, "hit"),
    (0966, 09, 66, "hit"),
    (1066, 10, 66, "hit"),
    (1166, 11, 66, "hit"),

    (0277, 02, 77, "split"),
    (0377, 03, 77, "split"),
    (0477, 04, 77, "split"),
    (0577, 05, 77, "split"),
    (0677, 06, 77, "split"),
    (0777, 07, 77, "split"),
    (0877, 08, 77, "hit"),
    (0977, 09, 77, "hit"),
    (1077, 10, 77, "hit"),
    (1177, 11, 77, "hit"),

    (0288, 02, 88, "split"),
    (0388, 03, 88, "split"),
    (0488, 04, 88, "split"),
    (0588, 05, 88, "split"),
    (0688, 06, 88, "split"),
    (0788, 07, 88, "split"),
    (0888, 08, 88, "split"),
    (0988, 09, 88, "split"),
    (1088, 10, 88, "split"),
    (1188, 11, 88, "split"),

    (0299, 02, 99, "split"),
    (0399, 03, 99, "split"),
    (0499, 04, 99, "split"),
    (0599, 05, 99, "split"),
    (0699, 06, 99, "split"),
    (0799, 07, 99, "stand"),
    (0899, 08, 99, "split"),
    (0999, 09, 99, "split"),
    (1099, 10, 99, "stand"),
    (1199, 11, 99, "stand"),

    (021111, 02, 1111, "split"),
    (031111, 03, 1111, "split"),
    (041111, 04, 1111, "split"),
    (051111, 05, 1111, "split"),
    (061111, 06, 1111, "split"),
    (071111, 07, 1111, "split"),
    (081111, 08, 1111, "split"),
    (091111, 09, 1111, "split"),
    (101111, 10, 1111, "split"),
    (111111, 11, 1111, "split");
