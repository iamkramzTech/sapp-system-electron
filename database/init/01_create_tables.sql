-- Use the database
USE `sappinit`;

-- Users table
CREATE TABLE `tblusers` (
  `user_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email_address` VARCHAR(255) NOT NULL UNIQUE,
  `hashed_password` VARCHAR(255) NOT NULL,
  `roles` ENUM('admin', 'user') DEFAULT 'user',
  `login_attempts` INT DEFAULT 0,
  `account_locked` BOOLEAN DEFAULT FALSE,
  `locked_until` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Signatories table
CREATE TABLE `tblsignatories` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `layout_order` INT NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit log table
CREATE TABLE `tblauditlog` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT(11) UNSIGNED,
  `action` ENUM('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT') NOT NULL,
  `table_name` VARCHAR(100) NOT NULL,
  `record_id` INT(11) UNSIGNED,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `details` TEXT,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES tblusers(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tblsessions` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `session_token_hash` CHAR(64) NOT NULL, -- SHA-256 hex
    `user_id` INT(11) UNSIGNED NULL,
    `data` VARBINARY(2048) NULL,            -- optional AES-encrypted session data
    `expires_at` DATETIME NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_token_hash (session_token_hash),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    CONSTRAINT fk_session_user FOREIGN KEY (user_id) 
    REFERENCES tblusers(user_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Parishioners
CREATE TABLE `tblparishioners` (
  `parishioner_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `middle_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `gender` ENUM('Male', 'Female') NOT NULL,
  `civil_status` ENUM('Single', 'Married', 'Widowed') NOT NULL,
   `photo_path` VARCHAR(255) NULL,
  `father_name` VARCHAR(100) NOT NULL,
  `mother_name` VARCHAR(100) NOT NULL,
  `religion` VARCHAR(50) NOT NULL,
  `residence_address` VARCHAR(255) NOT NULL,
  `occupation` VARCHAR(50) NULL,
  `income` DECIMAL(10,2) NULL,
  `registered_voter` TINYINT(1) DEFAULT 0,
  `out_town` TINYINT(1) DEFAULT 0,
  `present_address` VARCHAR(255) NULL,
  `contact_number` VARCHAR(15) NULL,
  `email_address` VARCHAR(255) NULL UNIQUE,
  `mass_goer` TINYINT(1) DEFAULT 0,
  `bec_member` TINYINT(1) DEFAULT 0,
  `alay_kapwa_contributor` TINYINT(1) DEFAULT 0, -- Default 0 means false by default
  `has_baptize` TINYINT(1) DEFAULT 1, -- Default 1 means true by default
  `baptism_book_number` INT(11) NOT NULL,
  `baptism_page_number` INT(11) NOT NULL,
  `baptism_date` DATE NOT NULL,
  `baptism_place` VARCHAR(255) NOT NULL,
  `baptism_officiating_minister` VARCHAR(255) NOT NULL,
  `baptism_book_archival` VARCHAR(255) NOT NULL,
  `baptism_male_sponsor` VARCHAR(255) NOT NULL,
  `baptism_female_sponsor` VARCHAR(255) NOT NULL,
  `is_confirmed` TINYINT(1) DEFAULT 0, -- 0 means false
  `confirmation_book_number` INT(11) NULL,
  `confirmation_page_number` INT(11) NULL,
  `confirmation_date` DATE NULL,
  `confirmation_place` VARCHAR(255) NULL,
  `confirmation_officiating_minister` VARCHAR(255) NULL,
  `confirmation_book_archival` VARCHAR(255) NULL,
  `confirmation_male_sponsor` VARCHAR(255) NULL,
  `confirmation_female_sponsor` VARCHAR(255) NULL,
  `is_married` TINYINT(1) DEFAULT 0, -- 0 means false
  `marriage_book_number` INT(11) NULL,
  `marriage_page_number` INT(11) NULL,
  `marriage_date` DATE NULL,
  `marriage_place` VARCHAR(255) NULL,
  `marriage_spouse_name` VARCHAR(100) NULL,
  `marriage_spouse_age` INT NULL,
  `marriage_spouse_status` VARCHAR(10) NULL,
  `marriage_spouse_residence` VARCHAR(255) NULL,
  `marriage_spouse_father` VARCHAR(100) NULL,
  `marriage_spouse_mother` VARCHAR(100) NULL,
  `marriage_officiating_minister` VARCHAR(255) NULL,
  `marriage_book_archival` VARCHAR(255) NULL,
  `marriage_male_sponsor` VARCHAR(255) NULL,
  `marriage_female_sponsor` VARCHAR(255) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `encoded_by` INT(11) UNSIGNED,
  `is_archived` TINYINT(1) DEFAULT 0,
  CONSTRAINT fk_parishioners_encoded_by FOREIGN KEY (encoded_by) REFERENCES tblusers(user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;