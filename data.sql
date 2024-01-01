CREATE DATABASE IF NOT EXISTS proof;
USE proof;

DROP TABLE IF EXISTS PaymentHistory;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Properties;
DROP TABLE IF EXISTS PaymentMethods;
DROP TABLE IF EXISTS Users;
-- Use the clementine database

-- Table: Users
-- This table stores information about users.
CREATE TABLE Users (
    UserID INT PRIMARY KEY,          -- Unique identifier for each user.
    UserType VARCHAR(20) NOT NULL,   -- Type of user (e.g., admin, regular user).
    Username VARCHAR(50) NOT NULL UNIQUE, -- Unique username for login.
    PasswordHash VARCHAR(100) NOT NULL,    -- Hashed password for security.
    Email VARCHAR(100) NOT NULL UNIQUE,
    Unit VARCHAR(100) NOT NULL UNIQUE,
    RentDueDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Address VARCHAR(100) NOT NULL UNIQUE  
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
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each transaction.
    PropertyID INT NOT NULL,                        -- Foreign key referencing the Properties table.
    TenantID INT NOT NULL,
    TenantName VARCHAR(100) NOT NULL,                          -- Foreign key referencing the Users table for tenant.
    Amount DECIMAL(10, 2) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Unit VARCHAR (10) DEFAULT NULL,        -- Amount of the transaction.
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




INSERT INTO Users
VALUES
  (1, 'admin', 'admin_user', 'hashed_password_admin', 'admin@example.com', 'Apt 1', '2023-12-20 08:00:00', '123 Main St, Anytown, USA'),
  (2, 'regular', 'john_doe', 'hashed_password_user1', 'john.doe@example.com', 'Apt 2', '2023-12-20 08:00:00', '456 Central Ave, Metropolis, USA'),
  (3, 'regular', 'jane_smith', 'hashed_password_user2', 'jane.smith@example.com', 'Apt 3', '2023-12-20 08:00:00', '789 Elm St, Springfield, USA');

INSERT INTO PaymentMethods
VALUES
  (1, 'credit'),
  (2, 'check'),
  (3, 'digital wallet');

INSERT INTO Properties (PropertyID, LandlordID, Rent, Address, Unit, DueDayOfMonth, OutstandingBalance) VALUES
  (1, 1, 1500.00, '123 Main St, Anytown, USA', 'Apt 1', 1, 0.00),
  (2, 2, 1800.00, '456 Central Ave, Metropolis, USA', 'Apt 202', 5, 300.00),
  (3, 3, 2000.00, '789 Elm St, Springfield, USA', 'Apt 423', 1, 0.00);



INSERT INTO Transactions (
    PropertyID,
    TenantID,
    TenantName,
    Amount,
    Address,
    Unit,
    PaymentMethodID,
    TransactionDate,
    CardNumber,
    RoutingNumber,
    DigitalWalletConfirmation,
    FiservPaymentID
) VALUES
    (1, 1, 'John Doe', 1200.00, '123 Main St', 'Unit A', 1, '2023-12-20 08:00:00', '1234567890123456', '987654321', 'Wallet123', 'FPID001'),
    (2, 2, 'Jane Smith', 1500.00, '456 Elm St', 'Unit B', 2, '2023-12-21 09:00:00', '2345678901234567', '876543210', 'Wallet456', 'FPID002'),
    (3, 3, 'Alice Johnson', 1000.00, '789 Oak St', 'Unit C', 3, '2023-12-22 10:00:00', '3456789012345678', '765432109', 'Wallet789', 'FPID003');
