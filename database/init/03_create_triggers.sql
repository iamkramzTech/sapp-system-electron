USE `sapp20250721`;

DELIMITER $$

CREATE TRIGGER `trg_PreventMarriageIfPendingConfirmation`
BEFORE INSERT ON `tblmarriage`
FOR EACH ROW
BEGIN
  DECLARE `confirm_status` VARCHAR(10);
  SELECT `c_status` INTO `confirm_status`
  FROM `tblconfirmation`
  WHERE parishioner_id = NEW.parishioner_id;

  IF confirm_status = 'Pending' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot insert into marriage. Parishioner''s confirmation is still pending.';
  END IF;
END$$

DELIMITER ;
