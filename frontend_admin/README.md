# Sagu Net ISP Management System (Admin)

Modern SaaS admin dashboard for ISP broadband management.

## Tech Stack

- React + Vite + TypeScript
- TailwindCSS v4
- lucide-react, react-router-dom, Zustand
- TanStack Table, Recharts, react-hook-form + zod
- Axios, sonner, dayjs, react-leaflet, framer-motion

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo Login

| Username    | Password     | Role        |
|-------------|--------------|-------------|
| admin       | admin123     | Admin       |
| manager     | manager123   | Manager     |
| staff       | staff123     | Staff       |
| technician  | tech123      | Technician  |

## Features

- JWT-style auth with role-based sidebar menus
- Dashboard with stats, charts, date filters, export actions
- Users (table, drawer, add modal, map)
- Subscriptions, Packages, Regions, Employees
- Expenses, Income Changes, Installation/Subscription Rules
- Reports, Settings (theme, APIs, backup)
- Dark/Light mode, notifications, mock API layer

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build
