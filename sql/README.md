# 🧾 SQL Scripts – Superstore KPI Dashboard

This folder contains all **SQL scripts** used in the `superstore-kpi-dashboard` project.

---

## 🧼 Script: `clean-superstore-sales.sql`

### 🔧 Purpose

This script performs initial **data cleansing and normalization** on the raw `sales` table loaded from the Superstore dataset.

### 🛠️ Operations Performed:

- ✅ Remove null or invalid records
- ✅ Standardize text casing (e.g., upper/lower/title case)
- ✅ Format `Postal_Code` as string for safe joins
- ✅ Ensure numeric fields are casted consistently
- ✅ Prepare table for KPI aggregations and dashboard use

### 📋 Initial Tasks:

```sql
DELETE FROM sales WHERE Customer_ID IS NULL;

UPDATE sales
SET Segment = UPPER(Segment);

UPDATE sales
SET Postal_Code = RIGHT('00000' + CAST(Postal_Code AS VARCHAR(5)), 5)
WHERE ISNUMERIC(Postal_Code) = 1;
```

---

## ⚙️ How to Use

1. Open `clean-superstore-sales.sql` in **SQL Server Management Studio (SSMS)**
2. Connect to your database: `superstore_db`
3. Execute the script (`F5` or right-click → Execute)

💡 Always `SELECT * FROM sales` before and after for visual verification.

---

## 🧼 Script: `clean-superstore-sales.sql`

### 🔧 Purpose

This script performs initial **data cleansing and normalization** on the raw `sales` table loaded from the Superstore dataset.

### 🛠️ Operations Performed:

- ✅ Create a sql view containing aggregations for kpis

### 📋 Initial Tasks:

```sql
CREATE VIEW v_kpi_dashboard_data AS
    SELECT
        FORMAT(Order_Date, 'yyyy-MM') AS Month,
        SUM(Sales) AS Total_Sales,
        AVG(Discount) AS Avg_Discount,
        SUM(Profit) / NULLIF(SUM(Sales), 0) AS Profit_Ratio,
        COUNT(DISTINCT Customer_ID) AS Unique_Customers
    FROM sales
    GROUP BY FORMAT(Order_Date, 'yyyy-MM');
```

---

## 📂 Other Future SQL Scripts

| Filename                 | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `index-optimization.sql` | Add indexes for query performance              |
| `export-snapshot.sql`    | Materialize cleaned KPI data into a flat table |
| `setup-db.sql`           | DDL for creating tables and constraints        |

---

## 🧠 Best Practices

- Keep one `.sql` file per logical purpose (cleaning, views, indexes)
- Use `-- comments` in every block for readability
- Use transactions (`BEGIN TRAN`, `ROLLBACK`, `COMMIT`) when making critical changes

---

**Author:** William Carter  
**Project:** Superstore KPI Dashboard  
📅 Last updated: March 2025
