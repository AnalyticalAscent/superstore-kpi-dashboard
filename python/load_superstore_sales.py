import pandas as pd
import pyodbc

import pandas as pd
import pyodbc

# Load the CSV
df = pd.read_csv("./data/Sample - Superstore.csv", encoding="latin1")

# Connect to SQL Server
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=superstore_db;"
    "Trusted_Connection=yes;"
)
cursor = conn.cursor()

# Loop through and insert rows
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO sales (
            Row_ID, Order_ID, Order_Date, Ship_Date, Ship_Mode,
            Customer_ID, Segment, Country, City, State,
            Postal_Code, Region, Product_ID, Category, Sub_Category,
            Product_Name, Sales, Quantity, Discount, Profit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
        int(row["Row ID"]),
        row["Order ID"],
        row["Order Date"],
        row["Ship Date"],
        row["Ship Mode"],
        row["Customer ID"],
        row["Segment"],
        row["Country"],
        row["City"],
        row["State"],
        str(row["Postal Code"]),
        row["Region"],
        row["Product ID"],
        row["Category"],
        row["Sub-Category"],
        row["Product Name"],
        float(row["Sales"]),
        int(row["Quantity"]),
        float(row["Discount"]),
        float(row["Profit"])
    )

conn.commit()
conn.close()
print("✅ Data inserted successfully!")
