CREATE DATABASE `BronzeSword` CHARACTER SET utf8 COLLATE utf8_general_ci;
create user 'BronzeSword'@'%' identified by '12345678';
grant all privileges on BronzeSword.* to 'BronzeSword'@'%';
flush privileges;