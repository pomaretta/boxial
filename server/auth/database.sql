DROP DATABASE IF EXISTS boxial;
CREATE DATABASE boxial;
USE boxial;

CREATE TABLE Users (
    id              INT NOT NULL AUTO_INCREMENT,
    username        VARCHAR(255) NOT NULL,
    password        VARCHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
);