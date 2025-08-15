-- Use the database
USE `sapp20250721`;

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
);

-- Signatories table
CREATE TABLE `tblsignatories` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `layout_order` INT NOT NULL,
  PRIMARY KEY(id)
);

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
);

-- Parishioners
CREATE TABLE `tblparishioners` (
  `parishioner_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `middle_name` VARCHAR(100) DEFAULT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `gender` ENUM('Male', 'Female') NOT NULL,
  `civil_status` ENUM('Single', 'Married', 'Widowed') NULL,
  `father_name` VARCHAR(100) NOT NULL,
  `mother_name` VARCHAR(100) NOT NULL,
  `religion` VARCHAR(50) NOT NULL,
  `permanent_address` VARCHAR(255) NOT NULL,
  `occupation` VARCHAR(50) NULL,
  `income` DECIMAL(10,2) NULL,
  `registered_voter` TINYINT(1) DEFAULT 0,
  `out_town` TINYINT(1) DEFAULT 0,
  `present_address` VARCHAR(255) NULL,
  `contact_number` VARCHAR(15) NULL,
  `email_address` VARCHAR(255) NULL UNIQUE,
  `mass_goer` TINYINT(1) DEFAULT 0,
  `bec_member` TINYINT(1) DEFAULT 0,
  `alay_kapwa_contributor` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `encoded_by` INT(11) UNSIGNED,
  `is_archived` TINYINT(1) DEFAULT 0,
  `photo_path` VARCHAR(255) NULL,
  CONSTRAINT fk_parishioners_encoded_by FOREIGN KEY (encoded_by) REFERENCES tblusers(user_id) ON DELETE SET NULL
);

-- Baptism
CREATE TABLE `tblbaptism` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT,
  `parishioner_id` INT(11) UNSIGNED NOT NULL,
  `book_number` INT(11) NOT NULL,
  `page_number` INT(11) NOT NULL,
  `baptism_date` DATE NOT NULL,
  `baptism_place` VARCHAR(255) NOT NULL,
  `sponsors` VARCHAR(255) NOT NULL,
  `officiating_minister` VARCHAR(255) NOT NULL,
  `encoded_by` INT(11) UNSIGNED,
  PRIMARY KEY (id),
  CONSTRAINT fk_baptism_parishioner FOREIGN KEY (parishioner_id) REFERENCES tblparishioners(parishioner_id) ON DELETE CASCADE,
  CONSTRAINT fk_baptism_encoded_by FOREIGN KEY (encoded_by) REFERENCES tblusers(user_id) ON DELETE SET NULL
);

-- Confirmation
CREATE TABLE `tblconfirmation` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT,
  `parishioner_id` INT(11) UNSIGNED NOT NULL,
  `book_number` INT(11),
  `page_number` INT(11),
  `confirmation_date` DATE,
  `confirmation_place` VARCHAR(255),
  `sponsors` VARCHAR(255),
  `officiating_minister` VARCHAR(255),
  `c_status` VARCHAR(10) DEFAULT 'Pending' CHECK (c_status IN ('Pending', 'Confirmed')),
  `encoded_by` INT(11) UNSIGNED,
  PRIMARY KEY (id),
  CONSTRAINT fk_confirmation_parishioner FOREIGN KEY (parishioner_id) REFERENCES tblparishioners(parishioner_id) ON DELETE CASCADE,
  CONSTRAINT fk_confirmation_encoded_by FOREIGN KEY (encoded_by) REFERENCES tblusers(user_id) ON DELETE SET NULL
);

-- Marriage
CREATE TABLE `tblmarriage` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT,
  `parishioner_id` INT(11) UNSIGNED NOT NULL,
  `book_number` INT(11),
  `page_number` INT(11),
  `marriage_date` DATE,
  `marriage_place` VARCHAR(255),
  `spouse_name` VARCHAR(100),
  `spouse_age` INT,
  `spouse_status` VARCHAR(10),
  `spouse_residence` VARCHAR(255),
  `spouse_father` VARCHAR(100),
  `spouse_mother` VARCHAR(100),
  `sponsors` VARCHAR(255),
  `officiating_minister` VARCHAR(255),
  `m_status` VARCHAR(10) DEFAULT 'Pending' CHECK (m_status IN ('Pending', 'Confirmed')),
  `encoded_by` INT(11) UNSIGNED,
  PRIMARY KEY (id),
  CONSTRAINT fk_marriage_parishioner FOREIGN KEY (parishioner_id) REFERENCES tblparishioners(parishioner_id) ON DELETE CASCADE,
  CONSTRAINT fk_marriage_encoded_by FOREIGN KEY (encoded_by) REFERENCES tblusers(user_id) ON DELETE SET NULL
);
