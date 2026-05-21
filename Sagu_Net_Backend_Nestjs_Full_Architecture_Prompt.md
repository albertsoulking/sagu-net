# Sagu Net ISP Management System — Backend Architecture Prompt

## 目标

基于现有 frontend_admin UI（React + Vite Admin Dashboard）重新构建完整后端系统。

要求：

* 删除所有 mock 数据
* 删除所有 mock API
* 删除 fake json
* 所有页面连接真实 API
* 使用 NestJS + TypeORM + MySQL
* backend 文件夹独立放在项目根目录
* frontend_admin 单独前端项目
* 前后端完全分离
* RESTful API
* JWT Authentication
* Role Permission System
* 企业级结构
* 高扩展性
* 支持 ISP 宽带业务逻辑

项目结构：

root/
├── frontend_admin/
├── backend/
├── docker-compose.yml
├── .env

---

# Backend 技术栈

使用：

* NestJS
* TypeORM
* MySQL
* JWT
* Passport
* bcrypt
* class-validator
* class-transformer
* multer
* swagger
* config
* cache-manager
* socket.io
* cron
* helmet
* compression
* rate-limit
* Winston Logger

---

# Backend 文件结构

backend/

src/
├── auth/
├── users/
├── subscriptions/
├── packages/
├── regions/
├── employees/
├── expenses/
├── income-changes/
├── installation-rules/
├── subscription-rules/
├── reports/
├── dashboard/
├── notifications/
├── uploads/
├── settings/
├── audit-logs/
├── common/
├── database/
├── config/
├── guards/
├── interceptors/
├── decorators/
├── filters/
├── pipes/
├── websocket/
├── scheduler/
├── main.ts
├── app.module.ts

---

# 数据库设计

使用 MySQL。

所有表必须：

* created_at
* updated_at
* deleted_at
* created_by
* updated_by

---

# Users Module

创建 users 表。

字段：

* id
* customer_id
* username
* phone
* email
* password
* address
* village
* township
* latitude
* longitude
* region_id
* package_id
* onu_mac
* onu_serial
* onu_type
* port_number
* cable_distance
* installation_type
* installation_fee
* subscription_start_date
* subscription_end_date
* remaining_days
* status
* last_payment_date
* last_online_at
* balance
* notes

关系：

* many-to-one regions
* many-to-one packages
* one-to-many subscriptions

API：

GET /users
GET /users/:id
POST /users
PATCH /users/:id
DELETE /users/:id
POST /users/:id/suspend
POST /users/:id/activate
POST /users/:id/renew

功能：

* Search
* Pagination
* Filter
* Sort
* Export Excel
* Soft Delete
* Audit Logs

---

# Auth Module

创建 JWT 登录系统。

功能：

* Login
* Logout
* Refresh Token
* Forgot Password
* Reset Password
* Role Permission
* Access Token
* Refresh Token
* Auto Token Rotation

角色：

* super_admin
* admin
* manager
* technician
* finance
* employee

权限：

* users.create
* users.update
* users.delete
* subscriptions.manage
* expenses.manage
* reports.view

API：

POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /auth/profile

---

# Packages Module

套餐表：

* id
* name
* speed
* category
* base_price
* installation_fee
* status
* description

API：

GET /packages
POST /packages
PATCH /packages/:id
DELETE /packages/:id

---

# Subscriptions Module

宽带续费系统。

字段：

* id
* user_id
* package_id
* payment_type
* months
* discount_percent
* extra_months
* installation_fee
* cable_fee
* total_amount
* start_date
* end_date
* payment_status
* created_by

功能：

* 自动计算结束时间
* 自动计算优惠
* 自动计算赠送月份
* 自动计算总价
* 自动生成 invoice
* 自动生成 receipt

API：

GET /subscriptions
POST /subscriptions
GET /subscriptions/:id

---

# Regions Module

字段：

* id
* village_name
* myanmar_name
* township
* latitude
* longitude
* coverage_radius
* active_users
* revenue
* coverage_percent
* status

API：

GET /regions
POST /regions
PATCH /regions/:id
DELETE /regions/:id

功能：

* 地图坐标
* coverage analytics
* user density
* map markers

---

# Employees Module

字段：

* id
* name
* phone
* position
* salary
* overtime_rate
* absent_deduction
* bonus
* advance_salary
* payable_salary
* attendance_days

API：

GET /employees
POST /employees
PATCH /employees/:id
DELETE /employees/:id
POST /employees/payroll

---

# Expenses Module

字段：

* id
* category
* title
* description
* quantity
* unit_price
* total_amount
* payment_type
* receipt_image
* expense_date

API：

GET /expenses
POST /expenses
PATCH /expenses/:id
DELETE /expenses/:id

---

# Dashboard Module

创建高级 Dashboard API。

返回：

* active users
* expired users
* revenue
* expense
* profit
* daily renewals
* package statistics
* cash flow
* latest activities

API：

GET /dashboard/summary
GET /dashboard/charts
GET /dashboard/recent-activities

---

# Reports Module

生成：

* Revenue Reports
* Expense Reports
* Profit Reports
* User Reports
* Region Reports
* Payroll Reports

导出：

* PDF
* Excel
* CSV

API：

GET /reports/revenue
GET /reports/expenses
GET /reports/profit

---

# Notifications Module

系统通知。

功能：

* 用户到期提醒
* 用户欠费提醒
* 安装工单提醒
* 收入异常提醒

使用：

* websocket
* socket.io

---

# Audit Logs Module

记录：

* 登录
* 删除
* 修改
* 财务操作
* 用户状态修改

字段：

* user
* action
* module
* old_data
* new_data
* ip
* user_agent

---

# Settings Module

系统设置：

* company logo
* company name
* invoice prefix
* sms config
* whatsapp config
* dark mode
* timezone
* currency

---

# 文件上传系统

支持：

* receipt image
* user documents
* invoices
* company logo

使用：

* multer
* static uploads

目录：

/uploads

---

# Frontend Admin API 重构

读取 frontend_admin 当前 UI。

要求：

* 删除所有 mock 数据
* 删除 mock services
* 删除 fake arrays
* 删除 local json
* 删除 setTimeout fake request

替换成真实 API：

services/

* auth.service.ts
* users.service.ts
* subscriptions.service.ts
* packages.service.ts
* regions.service.ts
* employees.service.ts
* expenses.service.ts
* dashboard.service.ts
* reports.service.ts

统一 axios instance：

* baseURL
* token interceptor
* refresh token interceptor
* error handler
* response handler

---

# Frontend 状态管理

使用 Zustand。

stores/

* auth.store.ts
* user.store.ts
* dashboard.store.ts
* notification.store.ts

功能：

* auth state
* token persistence
* dark mode
* notifications
* loading states

---

# Frontend API Integration

所有页面必须连接真实 API。

例如：

Dashboard：

* 获取 summary
* 获取 charts
* 获取 latest activity

Users：

* CRUD
* renew subscription
* suspend user

Regions：

* 地图 marker
* add region dialog
* analytics

Expenses：

* 上传 receipt
* charts
* export report

---

# Frontend Loading States

所有页面：

* skeleton loading
* table loading
* button loading
* optimistic updates
* retry state

---

# Frontend Error Handling

统一：

* axios error interceptor
* toast notification
* validation error
* unauthorized redirect
* network retry

---

# 前后端连接

使用：

Frontend:
[http://localhost:5173](http://localhost:5173)

Backend:
[http://localhost:3000/api](http://localhost:3000/api)

开启 CORS。

---

# 环境变量

backend/.env

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=3000

---

# TypeORM 配置

使用：

* migrations
* entities
* repositories
* soft delete
* relations

禁止 synchronize:true。

---

# 安全要求

必须实现：

* helmet
* rate limit
* password hashing
* JWT expiration
* role guards
* validation pipe
* sql injection prevention
* xss protection

---

# Swagger API

创建完整 Swagger 文档。

地址：

/api/docs

---

# Docker

创建：

* Dockerfile
* docker-compose

服务：

* frontend
* backend
* mysql
* phpmyadmin

---

# 最终目标

生成完整企业级 ISP Management System：

* NestJS Backend
* MySQL Database
* React Admin Frontend
* Real API Integration
* Remove All Mock Data
* Real Authentication
* Real CRUD
* Real Dashboard Analytics
* Real Reports
* Real Notifications
* Production Architecture
* Clean Scalable Structure
* ISP Business Logic

最终效果必须像真正商业 ISP 宽带运营后台，而不是 Demo 项目。
