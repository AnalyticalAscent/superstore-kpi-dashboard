# 🐍 Python ETL Scripts – Superstore KPI Dashboard

This folder contains Python scripts used for **loading, cleaning, and exporting** data for the `superstore-kpi-dashboard` full-stack project.

---

## 📄 Script: `load_superstore_sales.py`

### 🔧 Purpose

`load_superstore_sales.py` reads the **"Sample - Superstore.csv"** file and inserts its rows into the **`sales`** table inside the local **SQL Server** database `superstore_db`.

This is the first step in the ETL pipeline:

- ✅ Extract from CSV
- ✅ Transform field types (where needed)
- ✅ Load into SQL Server

---

### ⚙️ Usage

```bash
# Activate your virtual environment (if using one)
conda activate data-science  # or source ./venv/Scripts/activate

# Run the script
python load_superstore_sales.py
```

---

### 📥 Input

CSV file located at:

```
../public/data/Sample - Superstore.csv
```

Make sure the file is present and formatted correctly (Kaggle-exported original).

---

## 📄 Script: `create_kpi_json.py`

### 🔧 Purpose

`create_kpi_json.py` queries **v_kpi_dashboard_data** and exports the contents to `..\data\` in json format.

This is the first step in the ETL pipeline:

- ✅ Extract from SQL view
- ✅ Export as json format

### ⚙️ Usage

```bash
# Activate your virtual environment (if using one)
conda activate data-science  # or source ./venv/Scripts/activate

# Run the script
python create_kpi_json.py
```

---

### 📥 Input

SQL view located on local SQL server:

```
v_kpi_superstore_data
```

Make sure SQL view v_kpi_dashboard_data has been created.

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
- `../data/` — Holds raw CSV
- `../react/public/data/` — Holds output JSON

---

**Author:** William Carter  
**Project:** Superstore KPI Dashboard  
📅 Last updated: March 2025
