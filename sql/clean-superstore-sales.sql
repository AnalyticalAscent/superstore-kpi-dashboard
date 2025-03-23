DELETE FROM sales WHERE Customer_ID IS NULL;

UPDATE sales
SET Segment = UPPER(Segment);

UPDATE sales
SET Postal_Code = RIGHT('00000' + CAST(Postal_Code AS VARCHAR(5)), 5)
WHERE ISNUMERIC(Postal_Code) = 1;