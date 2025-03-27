# 📊 Superstore KPI Dashboard

An interactive, full-stack React dashboard that visualizes monthly performance metrics (KPIs) from the popular Superstore sales dataset — built for demonstration and learning purposes, not intended as a fully polished visual design

---

## 🚀 Features

- 🔄 Flip KPI cards to reveal metric descriptions
- 📈 Mini time-series charts embedded in each KPI card
- 📊 Click cards to view full bar charts of the selected KPI
- 🧭 Navigation bar to toggle between views (KPI, info, chart)
- ⚡ Fast and responsive UI powered by React
- 🧪 Clean backend SQL transformations with a Python data loader
- 🗂️ Organized project structure for full-stack devs

---

## 🗂️ Folder Structure

```
superstore-kpi-dashboard/
├── public/
│   └── data/
│       ├── dashboard.json         # Summary metrics
│       └── monthlydata.json       # Monthly time series data
├── react/                         # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── KpiCard.js
│   │   │   ├── MiniKpiChart.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── package.json
├── sql/
│   ├── create_superstore_db.sql
│   ├── clean-superstore-sales.sql
│   └── kpi_dashboard_view.sql
├── python/
│   ├── sql-uploader.py
│   └── README.md
├── .gitignore
├── README.md
└── LICENSE
```

---

## ⚙️ Setup Guide

### 🐍 1. Load & Prep Data (Python + SQL Server)

1. Install dependencies:

   ```bash
   pip install pandas pyodbc
   ```

2. Run SQL setup:

   - Open `sql/create_superstore_db.sql` in SSMS
   - Execute to create DB + `sales` table

3. Run the data uploader:

   ```bash
   python python/sql-uploader.py
   ```

4. Clean and transform with:

   - `clean-superstore-sales.sql`
   - `kpi_dashboard_view.sql`

5. Export result sets to:

```
public/data/dashboard.json       # Summary KPIs
public/data/monthlydata.json     # Monthly metrics
```

---

### ⚛️ 2. React Frontend

```bash
cd react
npm install
npm start
```

Runs locally at: [http://localhost:3000](http://localhost:3000)

---

## 🧭 How to Use

| Button        | Description                           |
| ------------- | ------------------------------------- |
| 🔹 KPI View   | Default: show KPI value + % change    |
| ℹ️ Info View  | Flip cards: show KPI definitions      |
| 📈 Chart View | Flip cards: mini line chart per KPI   |
| 📊 Click Card | Full bar chart of the selected metric |

---

## 📊 KPI Metrics

- **Total Sales**: Monthly sum of all sales
- **Profit Ratio**: `SUM(Profit) / SUM(Sales)`
- **Avg Discount**: Average discount per transaction
- **Unique Customers**: Number of distinct customers monthly

---

## 🧠 Tech Stack

| Layer    | Stack                     |
| -------- | ------------------------- |
| Frontend | React, Chart.js           |
| Backend  | SQL Server, T-SQL         |
| Data ETL | Python (pandas, pyodbc)   |
| Tooling  | ESLint, Prettier, VS Code |

---

## 🧹 Linting & Formatting

In `/react/`:

```bash
npx eslint src/
npx prettier --write "src/**/*.{js,jsx,json,css,md}"
```

> Make sure `.eslintrc.json` and `.prettierrc` are defined in your `/react/` directory.

---

## 📌 Future Enhancement Ideas

- Export charts as images or CSV
- Deploy to Netlify or Vercel
- Add user authentication (e.g. for multi-user KPIs)
- Role-based dashboards for functional departments

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
