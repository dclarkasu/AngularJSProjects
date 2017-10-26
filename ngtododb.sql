DROP DATABASE IF EXISTS `ngtododb`;

CREATE DATABASE IF NOT EXISTS `ngtododb` DEFAULT CHARACTER SET utf8;

USE `ngtododb`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `todo`;

CREATE TABLE IF NOT EXISTS `todo` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `task` varchar(55) NOT NULL,
  `description` text NULL,
  `completed` tinyint(1) NULL DEFAULT 0,
  `user_id` int(11) UNSIGNED NOT NULL,
  `due_date` varchar(50) NULL,
  `complete_date` varchar(50) NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' on update CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

START TRANSACTION;

USE `ngtododb`;
INSERT INTO `user` (`id`, `email`, `password`) VALUES (1, 'michaeljordan@spacejam.com', 'bugs');

INSERT INTO `todo` (`id`, `task`, `description`, `completed`, `user_id`, `due_date`, `complete_date`, `created_at`, `updated_at`) VALUES (1, 'Graduate SD', 'They are slave drivers here', 0, 1, 'November 20, 2017', null, '2017-10-25 11:00:00', '0000-00-00 00:00:00');

COMMIT;
