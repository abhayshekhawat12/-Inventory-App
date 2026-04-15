# 📦 Smart Inventory & Supply Chain Management System

<img width="1354" height="676" alt="image" src="https://github.com/user-attachments/assets/471ae8e4-341f-4b10-922e-419d3898af31" />

## 🌐 Live Demo
👉 **[Click here to view live project](https://inventory-system-five-hazel.vercel.app)**

## 📌 Project Overview
A full-stack Smart Inventory and Supply Chain Management System built as part of the Web Development Internship at **Codec Technologies**.

This platform allows businesses to track stock levels, manage suppliers, receive automated alerts, and forecast demand in real time.

## ✨ Features
- 📦 Stock level monitoring with real-time updates
- ⚠️ Automated low-stock alerts powered by Redis
- 🏭 Supplier management with ratings
- 📉 Demand forecasting reports
- 📄 Exportable inventory reports (CSV)
- 🔔 Alert notification system with read/unread status

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Cache & Alerts | Redis (Upstash) |
| Deployment | Vercel (Frontend), Render (Backend) |

## 🚀 Deployment
- **Frontend:** https://inventory-system-five-hazel.vercel.app
- **Backend:** https://inventory-system-1m5t.onrender.com
- **Repository:** https://github.com/swanandideshmukh/inventory-system

## 📁 Project Structure
```
inventory-system/
├── frontend/                    # Next.js app
│   ├── app/
│   │   ├── page.js             # Dashboard
│   │   ├── inventory/          # Inventory management
│   │   ├── suppliers/          # Supplier management
│   │   ├── alerts/             # Alerts & notifications
│   │   └── reports/            # Reports & analytics
│   └── components/
│       ├── Sidebar.js          # Navigation
│       ├── StockCard.js        # KPI cards
│       └── AlertBadge.js       # Alert component
└── backend/                    # Node.js API
    ├── routes/                 # API endpoints
    ├── db/                     # PostgreSQL connection
    ├── redis/                  # Redis connection
    └── cron/                   # Automated stock checker
```

## 🔧 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/inventory | Get all items |
| POST | /api/inventory | Add new item |
| PUT | /api/inventory/:id | Update stock |
| DELETE | /api/inventory/:id | Delete item |
| GET | /api/suppliers | Get all suppliers |
| POST | /api/suppliers | Add supplier |
| GET | /api/alerts | Get all alerts |
| PUT | /api/alerts/:id/read | Mark alert read |
| GET | /api/reports/stock | Stock report |
| GET | /api/reports/demand | Demand forecast |

## 👩‍💻 Developer
**Swanandi Deshmukh**
Web Development Intern @ Codec Technologies
