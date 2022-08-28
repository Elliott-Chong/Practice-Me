-- @block
alter user 'practiceme_user' @'%' identified with mysql_native_password by 'practiceme!@#$';
-- @block
create user 'practiceme_user' @'localhost' identified by 'practiceme!@#$';
-- @block
create database 'practiceme_db';
-- @block
grant all privileges on `practiceme_db`.* to `practiceme_user` @'localhost';
-- @block
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    course ENUM('DIT', 'DCITP', 'DAAA', 'DISM') NOT NULL,
    avatar VARCHAR(255),
    score BIGINT DEFAULT 0
) -- 
-- @block
INSERT INTO Users (email, password, name, course, avatar, score)
VALUES (
        'CHONGZ.22@ichat.sp.edu.sg',
        '$2a$10$sjVzXuGHkBGU5Wjssj7cG.9mrWkgUbTSWBLe6Uf1GL9tukjWAVTlq',
        'CHONGZ',
        'DIT',
        'https://lh3.googleusercontent.com/a-/AFdZucr6TBC8jzwRugHT_eHDVWCtlojnWn99HT8kDsyo=s96-c',
        934
    ) --
    -- @block
SELECT id,
    email,
    name,
    class,
    course,
    avatar
from Users;
--
-- @block
ALTER TABLE Users
MODIFY COLUMN score DOUBLE DEFAULT 0;