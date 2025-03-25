# Connect to SQL Server
import pandas as pd
import pyodbc

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=superstore_db;"
    "Trusted_Connection=yes;"
)
cursor = conn.cursor()

df = pd.read_sql("SELECT * FROM v_kpi_dashboard_data", conn)
df.to_json("./react/public/data/dashboard.json", orient="records")