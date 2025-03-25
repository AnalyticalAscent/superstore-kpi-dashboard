CREATE VIEW v_kpi_dashboard_data AS
    SELECT
        FORMAT(Order_Date, 'yyyy-MM') AS Month,
        SUM(Sales) AS Total_Sales,
        AVG(Discount) AS Avg_Discount,
        SUM(Profit) / NULLIF(SUM(Sales), 0) AS Profit_Ratio,
        COUNT(DISTINCT Customer_ID) AS Unique_Customers
    FROM sales
    GROUP BY FORMAT(Order_Date, 'yyyy-MM');