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

Creates a view with time-series data for KPIs for building out graphs.

### 🛠️ Operations Performed:

- ✅ Create a sql view containing aggregations for kpis

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

## 🧼 Script: `create-view-kpi-card-data`

Creates a view with summary data for KPI card dashboard.

### 🛠️ Operations Performed:

- ✅ Create a sql view containing summary for KPI cards

```sql
CREATE VIEW v_kpi_dashboard_cards AS
WITH kpi_months AS (
    SELECT
        FORMAT(Order_Date, 'yyyy-MM') AS Month,
        SUM(Sales) AS Total_Sales,
        AVG(Discount) AS Avg_Discount,
        SUM(Profit) / NULLIF(SUM(Sales), 0) AS Profit_Ratio,
        COUNT(DISTINCT Customer_ID) AS Unique_Customers
    FROM sales
    GROUP BY FORMAT(Order_Date, 'yyyy-MM')
),
ranked AS (
    SELECT *,
           ROW_NUMBER() OVER (ORDER BY Month DESC) AS rn
    FROM kpi_months
),
curr_prev AS (
    SELECT
        curr.Month AS CurrentMonth,
        prev.Month AS PrevMonth,

        curr.Total_Sales AS Sales_Current,
        prev.Total_Sales AS Sales_Previous,

        curr.Avg_Discount AS Discount_Current,
        prev.Avg_Discount AS Discount_Previous,

        curr.Profit_Ratio AS Profit_Current,
        prev.Profit_Ratio AS Profit_Previous,

        curr.Unique_Customers AS Customers_Current,
        prev.Unique_Customers AS Customers_Previous
    FROM ranked curr
    JOIN ranked prev ON curr.rn = 1 AND prev.rn = 2
)
SELECT
    'Total Sales' AS title,
    Sales_Current AS value,
    ROUND(((Sales_Current - Sales_Previous) / NULLIF(Sales_Previous, 0)) * 100, 2) AS percentage,
    CASE WHEN Sales_Current - Sales_Previous >= 0 THEN 1 ELSE 0 END AS isPositive
FROM curr_prev

UNION ALL

SELECT
    'Avg Discount',
    Discount_Current,
    ROUND(((Discount_Current - Discount_Previous) / NULLIF(Discount_Previous, 0)) * 100, 2),
    CASE WHEN Discount_Current - Discount_Previous >= 0 THEN 1 ELSE 0 END
FROM curr_prev

UNION ALL

SELECT
    'Profit Ratio',
    Profit_Current,
    ROUND(((Profit_Current - Profit_Previous) / NULLIF(Profit_Previous, 0)) * 100, 2),
    CASE WHEN Profit_Current - Profit_Previous >= 0 THEN 1 ELSE 0 END
FROM curr_prev

UNION ALL

SELECT
    'Unique Customers',
    Customers_Current,
    ROUND(((Customers_Current - Customers_Previous) / NULLIF(Customers_Previous, 0)) * 100, 2),
    CASE WHEN Customers_Current - Customers_Previous >= 0 THEN 1 ELSE 0 END
FROM curr_prev;

```

---

## 🧠 Best Practices

- Keep one `.sql` file per logical purpose (cleaning, views, indexes)
- Use `-- comments` in every block for readability
- Use transactions (`BEGIN TRAN`, `ROLLBACK`, `COMMIT`) when making critical changes

---

**Author:** William Carter  
**Project:** Superstore KPI Dashboard  
📅 Last updated: March 2025
