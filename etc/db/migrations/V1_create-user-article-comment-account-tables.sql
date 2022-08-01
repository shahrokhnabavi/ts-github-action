DROP DATABASE IF EXISTS `ts-db`;
CREATE DATABASE `ts-db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ts-db`;

CREATE TABLE languages
(
    `language_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(255) NOT NULL,
    `iso_code`    VARCHAR(4)   NOT NULL,
    PRIMARY KEY (`language_id`)
) ENGINE InnoDB;

INSERT INTO languages (title, iso_code) VALUES ('Nederlands', 'nl'), ('English', 'en'), ('فارسی', 'fa');

CREATE TABLE users_profile
(
    `user_profile_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name`      VARCHAR(255) NOT NULL,
    `last_name`       VARCHAR(255) NOT NULL,
    `bio`             text         NOT NULL,
    `profile_pic`     VARCHAR(255) NOT NULL,
    `created_at`      DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_profile_id`)
) ENGINE InnoDB;

CREATE TABLE accounts
(
    `account_id`      INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `username`        VARCHAR(255)   NOT NULL UNIQUE,
    `email`           VARCHAR(255)   NOT NULL UNIQUE,
    `password`        VARCHAR(32)    NOT NULL,
    `activated`       ENUM ('0','1') NOT NULL,
    `user_profile_id` INT UNSIGNED   NOT NULL,
    `created_at`      DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`account_id`),
    FOREIGN KEY (`user_profile_id`) REFERENCES users_profile (`user_profile_id`)
) ENGINE InnoDB;

CREATE TABLE articles
(
    `article_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `account_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`article_id`),
    FOREIGN KEY (`account_id`) REFERENCES accounts (`account_id`)
) ENGINE InnoDB;

CREATE TABLE articles_inf
(
    `article_id`  INT UNSIGNED NOT NULL,
    `language_id` INT UNSIGNED NOT NULL,
    `title`       VARCHAR(255) NOT NULL,
    `content`     text         NOT NULL,
    PRIMARY KEY (`article_id`, `language_id`),
    FOREIGN KEY (`language_id`) REFERENCES languages (`language_id`)
) ENGINE InnoDB;

CREATE TABLE comments
(
    `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment`    VARCHAR(1024) NOT NULL,
    `article_id` INT UNSIGNED NOT NULL,
    `account_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`comment_id`),
    FOREIGN KEY (`article_id`) REFERENCES articles (`article_id`),
    FOREIGN KEY (`account_id`) REFERENCES accounts (`account_id`)
) ENGINE InnoDB;
