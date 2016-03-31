CREATE TABLE `group`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `adminId` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_admin_id` FOREIGN KEY (`adminId`) REFERENCES users (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8