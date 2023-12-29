CREATE DATABASE IF NOT EXISTS proof;
USE proof;

DROP TABLE IF EXISTS PaymentHistory;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Properties;
DROP TABLE  IF EXISTS PaymentMethods;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Receipts;
-- Use the clementine database

-- Table: Users
-- This table stores information about users.
CREATE TABLE Users (
    UserID INT PRIMARY KEY,          -- Unique identifier for each user.
    UserType VARCHAR(20) NOT NULL,   -- Type of user (e.g., admin, regular user).
    Username VARCHAR(50) NOT NULL UNIQUE, -- Unique username for login.
    PasswordHash VARCHAR(100) NOT NULL,    -- Hashed password for security.
    Email VARCHAR(100) NOT NULL UNIQUE     -- Email address of the user.
);

-- Table: PaymentMethods
-- This table stores information about payment methods associated with users.
CREATE TABLE PaymentMethods (
    MethodID INT PRIMARY KEY,        -- Unique identifier for each payment method.
    MethodType VARCHAR(20) NOT NULL -- Type of payment method (e.g., credit card).
);

-- Table: Properties
-- This table stores information about properties owned by landlords.
CREATE TABLE Properties (
    PropertyID INT PRIMARY KEY,      -- Unique identifier for each property.
    LandlordID INT NOT NULL,         -- Foreign key referencing the Users table for landlord.
    Rent DECIMAL(10,2) NOT NULL,     -- Price in rent for the property.
    Address VARCHAR(255) NOT NULL,
    Unit VARCHAR (10) DEFAULT NULL,   -- Address of the property.
    DueDayOfMonth INT(4),            -- Day of the month on which rent is due
    OutstandingBalance DECIMAL(10,2) NOT NULL,        -- Total amount of rent past due
    FOREIGN KEY (LandlordID) REFERENCES Users(UserID) -- Relationship with Users table.
);

-- Table: Transactions
-- This table stores information about financial transactions.
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,         -- Unique identifier for each transaction.
    PropertyID INT NOT NULL,                        -- Foreign key referencing the Properties table.
    TenantID INT NOT NULL,                          -- Foreign key referencing the Users table for tenant.
    Amount DECIMAL(10, 2) NOT NULL,        -- Amount of the transaction.
    PaymentMethodID INT NOT NULL,                   -- Foreign key referencing the PaymentMethods table.
    TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date and time of the transaction.
    CardNumber VARCHAR(16) DEFAULT NULL,                 -- Card number for credit card.
    RoutingNumber VARCHAR(16) DEFAULT NULL,              -- Routing number for check/bankaccount
    DigitalWalletConfirmation VARCHAR(30) DEFAULT NULL,
    FiservPaymentID VARCHAR(50),   -- Digital Wallet Confirmation number
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID), -- Relationship with Properties table.
    FOREIGN KEY (TenantID) REFERENCES Users(UserID),           -- Relationship with Users table.
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethods(MethodID) -- Relationship with PaymentMethods table.
);


-- Table: PaymentHistory
-- This table stores the payment history associated with transactions.
CREATE TABLE PaymentHistory (
    PaymentID INT PRIMARY KEY,            -- Unique identifier for each payment record.
    TransactionID INT,                    -- Foreign key referencing the Transactions table.
    Status VARCHAR(20) NOT NULL,          -- Status of the payment (e.g., successful, pending).
    ReceiptURL VARCHAR(255),               -- URL to the payment receipt.
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID) -- Relationship with Transactions table.
);


CREATE TABLE Receipts(
  PaymentID INT AUTO_INCREMENT PRIMARY KEY,
  PaymentAmount INT,
  Address VARCHAR(100),
  Name VARCHAR(35),
  PaymentDate VARCHAR(10) 
  );

INSERT INTO Receipts (PaymentAmount, Address, Name,PaymentDate)
VALUES
  (123123,'admin@example.com', 'admin_user','2012-01-01'),
  (123123, 'john.doe@example.com','john_doe','2012-01-02'),
  (123123, 'jane.smith@example.com','jane_smith', '2012-01-03');



INSERT INTO Users
VALUES
  (1, 'admin', 'admin_user', 'hashed_password_admin', 'admin@example.com'),
  (2, 'regular', 'john_doe', 'hashed_password_user1', 'john.doe@example.com'),
  (3, 'regular', 'jane_smith', 'hashed_password_user2', 'jane.smith@example.com');

INSERT INTO PaymentMethods
VALUES
  (1, 'credit'),
  (2, 'check'),
  (3, 'digital wallet');

INSERT INTO Properties
VALUES 
  (1, 1, 2, 1000.00, '627 E 6th Street, Unit 2, New York NY 10009', 1 ),
  (2, 1, 3, 20000.00, '100 Connell Drive, NULL, Berkeley Heights NJ 07922', 4);

INSERT INTO Transactions (TransactionID, PropertyID, TenantID, Amount, PaymentMethodID, CardNumber, RoutingNumber, DigitalWalletConfirmation)
VALUES
  (1, 1, 1, 1000.00, 1, NULL, '123123123', NULL),
  (2, 2, 2, 20000.00, 2, '1234567890', NULL, NULL),;