CREATE DATABASE IF NOT EXISTS proof;

-- Use the clementine database
USE proof;

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
    UserID INT,                      -- Foreign key referencing the Users table.
    MethodType VARCHAR(20) NOT NULL, -- Type of payment method (e.g., credit card).
    CardNumber VARCHAR(16),          -- Card number for credit card.
    FOREIGN KEY (UserID) REFERENCES Users(UserID) -- Relationship with Users table.
);

-- Table: Properties
-- This table stores information about properties owned by landlords.
CREATE TABLE Properties (
    PropertyID INT PRIMARY KEY,      -- Unique identifier for each property.
    LandlordID INT,                  -- Foreign key referencing the Users table for landlord.
    Address VARCHAR(255) NOT NULL,   -- Address of the property.
    FOREIGN KEY (LandlordID) REFERENCES Users(UserID) -- Relationship with Users table.
);

-- Table: Transactions
-- This table stores information about financial transactions.
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,         -- Unique identifier for each transaction.
    PropertyID INT,                        -- Foreign key referencing the Properties table.
    TenantID INT,                          -- Foreign key referencing the Users table for tenant.
    Amount DECIMAL(10, 2) NOT NULL,        -- Amount of the transaction.
    PaymentMethodID INT,                   -- Foreign key referencing the PaymentMethods table.
    TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date and time of the transaction.
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
  (1, 'admin', 'admin_user', 'hashed_password_admin', 'admin@example.com'),
  (2, 'regular', 'john_doe', 'hashed_password_user1', 'john.doe@example.com'),
  (3, 'regular', 'jane_smith', 'hashed_password_user2', 'jane.smith@example.com');