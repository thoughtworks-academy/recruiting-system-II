CREATE TABLE `groupUser`(
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  CONSTRAINT `fk_group_user_group_id` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON UPDATE CASCADE ON DELETE CASCADE ,
  CONSTRAINT `fk_group_user_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE ,
  UNIQUE INDEX(`groupId`, `userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8