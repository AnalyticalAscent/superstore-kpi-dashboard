# 🐍 Python ETL Scripts – Superstore KPI Dashboard

This folder contains Python scripts used for **loading, cleaning, and exporting** data for the `superstore-kpi-dashboard` full-stack project.

---

## 📄 Script: `sql-uploader.py`

### 🔧 Purpose

`sql-uploader.py` reads the **"Sample - Superstore.csv"** file and inserts its rows into the **`sales`** table inside the local **SQL Server** database `superstore_db`.

This is the first step in the ETL pipeline:

- ✅ Extract from CSV
- ✅ Transform field types (where needed)
- ✅ Load into SQL Server

---

## ⚙️ Usage

```bash
# Activate your virtual environment (if using one)
conda activate data-science  # or source ./venv/Scripts/activate

# Run the script
python load_superstore_sales.py
```

---

## 📥 Input

CSV file located at:

```
../public/data/Sample - Superstore.csv
```

Make sure the file is present and formatted correctly (Kaggle-exported original).

---

## 🛠️ Requirements

- Python 3.x
- `pandas`
- `pyodbc`
- ODBC Driver 17 or 18 for SQL Server
- SQL Server running locally

### Example ODBC Connection String

```python
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=superstore_db;"
    "Trusted_Connection=yes;"
)
```

---

## 🧠 Notes

- Uses parameterized queries (`?`) for secure insert
- Handles encoding issues via `encoding="latin1"` when reading the CSV
- Assumes table `sales` already exists in the database
- Converts select fields to `int`, `float`, or `str` types before insert

---

## 🚧 Future Improvements

- [ ] Add batch inserts for better performance
- [ ] Add error logging for skipped or malformed rows
- [ ] Add command-line args for filename / DB config
- [ ] Add a script for exporting KPIs to JSON

---

## 📂 Related Folders

- `../sql/` — DDL, view creation, and SQL logic
- `../react/` — Frontend dashboard using exported JSON
- `../public-data/` — Holds raw CSV and output JSON

---

**Author:** William Carter  
**Project:** Superstore KPI Dashboard  
📅 Last updated: March 2025
