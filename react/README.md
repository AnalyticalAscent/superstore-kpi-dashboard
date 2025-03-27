# 📦 React Frontend

This folder contains the **React-based frontend** for the Superstore KPI Dashboard. It renders interactive KPI cards, mini visualizations, and routes for navigating between views. The app is powered by data prepared in the backend and delivered as static `.json` files.

⚠️ _Note: This frontend is intended for demonstration purposes and is not fully optimized for production-grade UX/UI design._

---

## 🗂️ Folder Structure

```
react/
├── public/                     # Static assets and data files
│   └── data/
│       ├── dashboard.json      # Summary KPIs
│       └── monthlydata.json    # Time series data per KPI
├── src/
│   ├── components/             # Modular UI components
│   │   ├── Dashboard.js        # Main dashboard container
│   │   ├── KpiCard.js          # Flippable KPI cards
│   │   ├── MiniKpiChart.js     # Line/bar chart component
│   │   └── ...
│   ├── App.js                  # Top-level routes and layout
│   ├── index.js                # React app entry point
│   └── index.css               # Global styles
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── package.json                # Project metadata and dependencies
└── README.md                   # You're here
```

---

## ⚙️ Getting Started

1. Navigate to the `react/` folder:

```bash
cd react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

> App runs at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Data Files

Place your JSON data files in:

```
public/data/
```

Required files:

- `dashboard.json` — Contains summary metrics for front-facing KPI cards.
- `monthlydata.json` — Contains time series data for mini and bar charts.

---

## 🔄 Available Views

| Mode    | Trigger             | Description                         |
| ------- | ------------------- | ----------------------------------- |
| `front` | Default             | Shows KPI name, value, and % change |
| `back`  | Info button         | Shows description of the metric     |
| `chart` | "Mini Chart" toggle | All cards show line chart sparkline |
| `bar`   | Click any card      | That card shows a full bar chart    |

---

## 🧹 Code Style

Run ESLint and Prettier using:

```bash
npx eslint src/
npx prettier --write "src/**/*.{js,jsx,json,css,md}"
```

---

## ✅ Dependencies

- React 18+
- react-chartjs-2
- chart.js
- react-router-dom
- ESLint + Prettier

---

## 🧠 Notes

- React Router v6 is used (`<Routes>` and `element={<Component />}` syntax)
- Chart type is controlled via props (`chartType="line"` or `"bar"`)
- Global card view state is managed via `cardView` in `Dashboard.js`
- Per-card override (bar chart) is managed via `activeChartIndex`

---

## 🛠️ Future Ideas

- Add dark mode toggle
- Add filtering or KPI drilldowns
- Export charts as image/CSV
- Mobile-responsive card layout

---

## 📄 License

MIT — Free to use, modify, and learn from.
