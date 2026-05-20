# Sagu Net ISP 管理系统 — 完整网站生成 Prompt（Vite + React + TypeScript + Lucide React）

## 项目概述

创建一个现代化、响应式、企业级 ISP（互联网服务提供商）管理系统，项目名称为 “Sagu Net ISP Management System”。

新建文件夹 frontend_admin，使用 Vite + React + TypeScript 搭建前端项目。

技术栈要求：

* Frontend: React + Vite + TypeScript
* UI: TailwindCSS
* Icons: lucide-react
* Routing: react-router-dom
* State Management: Zustand
* Table: TanStack Table
* Charts: Recharts
* Form: react-hook-form + zod
* API: Axios
* Notifications: sonner
* Date: dayjs
* Map: leaflet 或 react-leaflet
* UI 风格：现代化 SaaS Dashboard 风格
* Dark / Light Mode
* Fully Responsive
* Sidebar Layout
* Mobile Navigation
* Loading Skeleton
* Empty States
* Error Boundaries
* Permission-based UI

系统类型：

这是一个 ISP 宽带管理系统，主要功能：

* 用户管理
* 套餐管理
* 宽带续费
* 安装工单
* 财务统计
* 员工工资管理
* 区域管理
* 支出管理
* 收入管理
* Dashboard 数据分析
* ONU 设备管理
* 网络端口管理
* 地图定位
* 登录权限系统

---

# UI 风格要求

整体设计风格：

* 类似现代 SaaS Admin Dashboard
* 使用玻璃拟态 + 卡片式布局
* 圆角 16px
* 阴影柔和
* 主色调：蓝色 + 青色
* Dark Mode 支持
* Hover 动效
* 页面切换动画
* Framer Motion 页面动画
* 顶部统计卡片渐变背景

布局：

* 左侧 Sidebar
* 顶部 Header
* 内容区域
* 右上角用户菜单
* 通知按钮
* 搜索框

Sidebar 菜单：

* Dashboard
* Users
* Subscriptions
* Packages
* Regions
* Employees
* Expenses
* Income Changes
* Installation Rules
* Subscription Rules
* Reports
* Settings
* Logout

所有菜单使用 lucide-react 图标。

例如：

* LayoutDashboard
* Users
* Wallet
* CreditCard
* MapPinned
* BadgeDollarSign
* Receipt
* TrendingUp
* Settings
* LogOut

---

# 登录页面（新增）

创建完整登录系统。

## Login Page UI

布局：

* 左侧品牌介绍
* 右侧登录表单
* 背景渐变
* 毛玻璃效果
* Logo
* ISP 插画

字段：

* Username
* Password
* Remember Me
* Login Button
* Forgot Password

功能：

* JWT 登录
* 登录 Loading
* 登录失败 Toast
* Enter 键登录
* Token 保存
* 自动登录
* Token 过期跳转

交互：

* Input Focus Glow
* Password Show/Hide
* 登录按钮 Loading Spinner
* 表单验证

权限：

* Admin
* Manager
* Staff
* Technician

不同角色显示不同菜单。

---

# Dashboard 页面

创建高级 ISP 数据 Dashboard。

## 顶部统计卡片

显示：

* Active Users
* Expired Users
* Total Revenue
* Total Expense
* Net Profit
* Bandwidth Usage
* Cash Balance
* Kpay Balance

卡片内容：

* 图标
* 数值
* 百分比变化
* 趋势箭头
* 小图表

## 图表区域

使用 Recharts。

图表：

1. Revenue vs Expense
2. Daily Renewals
3. Package Distribution
4. Active vs Inactive Users
5. Cash Flow
6. Monthly Profit

## Recent Activities

显示：

* 最近续费
* 最近安装
* 最近支出
* 最近新增用户

## Dashboard 交互

* 日期筛选

* Today

* Yesterday

* This Week

* This Month

* Custom Range

* 图表 hover tooltip

* 数据刷新按钮

* Export PDF

* Export Excel

---

# Users 页面

核心用户管理系统。

## Users Table

字段：

* User ID
* Username
* Phone
* Region
* Plan
* Months
* End Date
* Remaining Days
* Status
* ONU Status
* Port
* Cable Length
* Registration Date

功能：

* Search
* Filter
* Sort
* Pagination
* Export Excel
* Bulk Actions
* Column Toggle
* Responsive Table

状态颜色：

* Active = Green
* Expired = Red
* Warning = Orange
* Free = Blue

## 用户详情 Drawer

点击用户打开侧边 Drawer。

显示：

* 用户信息
* 地图位置
* ONU 信息
* Subscription History
* Payment History
* Notes
* Installation Details

## Add User Modal

字段：

* Username
* Phone
* Region
* Package
* Months
* Installation Type
* Latitude/Longitude
* Port
* Cable Meter
* ONU MAC
* ONU Type

功能：

* 自动计算价格
* 自动计算安装费
* 自动计算折扣
* 自动计算到期时间

## 地图功能

使用 react-leaflet。

功能：

* 地图标记用户位置
* 点击地图自动获取坐标
* 显示区域覆盖
* ONU 安装位置

## 用户交互

* 一键续费
* Suspend User
* Activate User
* Delete User
* Print Receipt
* Generate Invoice
* SMS Reminder
* WhatsApp Reminder

---

# Subscription 页面

宽带续费系统。

## Subscription Records Table

字段：

* Date
* User ID
* Package Plan
* Months
* Installation Type
* Payment Type
* Start Date
* End Date
* Discount
* Actual Price

## 功能

* Quick Renewal
* Multi Month Renewal
* Discount Rules
* Extra Months Rules
* Auto Price Calculation
* Cash/Kpay Payment

## 续费交互

选择：

* 用户
* 套餐
* 月数
* 安装类型

系统自动：

* 计算折扣
* 计算赠送月份
* 计算总价格
* 计算结束日期

显示 Summary Card：

* Base Price
* Discount
* Installation Fee
* Final Price

---

# Package Plans 页面

套餐管理。

## 套餐列表

字段：

* Category
* Plan
* Base Price

套餐：

* 15 Mbps
* 20 Mbps
* 30 Mbps
* 45 Mbps
* 60 Mbps

## UI

使用 Pricing Card 风格。

每个卡片：

* 网速
* 价格
* 用户数量
* 收入统计
* 编辑按钮
* 删除按钮

## 交互

* Add Plan
* Edit Plan
* Delete Plan
* Plan Analytics

---

# Regions 页面

区域管理系统。

## 区域列表

字段：

* Village Name
* Myanmar Description
* Active Users
* Revenue
* Coverage

## 地图功能

* 区域覆盖地图
* 热力图
* 用户密度
* Fiber Coverage

## 交互

* Add Region
* Edit Region
* Delete Region
* Region Analytics

---

# Employees 页面

员工工资系统。

## 员工列表

字段：

* Name
* Phone
* Position
* Department
* Basic Salary
* Advance Payment
* Bonus
* Overtime
* Absent Days
* Payable Wages

## 工资计算逻辑

系统自动：

* 缺勤扣款
* 加班工资
* 全勤奖金
* Advance Deduction
* 最终工资

## Employee Detail

显示：

* 工资历史
* KPI
* 工作记录
* 安装数量
* 维修数量

## 交互

* Pay Salary
* Export Payslip
* Generate Payroll
* Attendance Management

---

# Expenses 页面

支出管理系统。

## Expense Table

字段：

* Date
* Name
* Category
* Payment Type
* Single Amount
* Quantity
* Total Amount

## 分类系统

分类：

* HR & Payroll
* Vehicle Maintenance
* Petrol
* Equipment
* Fiber Cable
* Office Expense
* Marketing
* Utilities

## 交互

* Add Expense
* Upload Receipt
* Preview Image
* Expense Analytics
* Export Report

## 图表

* Expense by Category
* Monthly Expense
* Payment Type Distribution

---

# Income Changes 页面

收入变动系统。

## 功能

* 手动调整收入
* Cash Flow Tracking
* Daily Balance
* Financial Status

字段：

* Date
* Payment Type
* Direction
* Amount
* Description

---

# Installation Rules 页面

安装规则系统。

## 功能

定义：

* Installation Fee
* Free Distance
* Extra Meter Price

类型：

* Renewal
* Free Installation
* Standard Installation
* ONU Relocation

系统自动计算：

* Cable Fee
* Installation Fee
* Final Amount

---

# Subscription Rules 页面

订阅优惠规则系统。

## 规则

* 1 Month
* 3 Months
* 6 Months
* 12 Months

自动：

* 折扣
* 赠送月份
* Promotion Badge

---

# Reports 页面

高级报表系统。

## 报表类型

* Revenue Report
* Expense Report
* Profit Report
* User Growth Report
* Region Report
* Employee Payroll Report

## 导出

* PDF
* Excel
* CSV

## Filters

* Date Range
* Region
* Plan
* Payment Type

---

# Settings 页面

系统设置。

## 功能

* Company Logo
* Company Name
* Theme
* Dark Mode
* Notification Settings
* SMS API
* WhatsApp API
* Currency
* Tax
* Backup Database

---

# Header 功能

顶部 Header 包含：

* Global Search
* Notifications
* Theme Toggle
* User Profile
* Quick Actions

Quick Actions：

* Add User
* Quick Renewal
* Add Expense
* Generate Report

---

# 通知系统

通知类型：

* 用户即将到期
* 用户已过期
* 新安装工单
* 收入异常
* 支出超预算

通知 UI：

* Dropdown
* Toast
* Real-time Badge

---

# 数据库设计建议

主要表：

* users
* subscriptions
* package_plans
* regions
* employees
* expenses
* income_changes
* installation_rules
* subscription_rules
* notifications
* audit_logs
* roles
* permissions

---

# API 设计

RESTful API：

* /auth/login
* /auth/profile
* /users
* /subscriptions
* /packages
* /regions
* /employees
* /expenses
* /reports

功能：

* Pagination
* Search
* Filter
* Sorting
* JWT Auth
* Role Permission

---

# 前端结构

src/

* components/
* pages/
* layouts/
* hooks/
* services/
* store/
* types/
* utils/
* routes/
* constants/
* forms/

---

# 页面动画

使用 Framer Motion：

* Page Fade
* Card Hover
* Sidebar Collapse
* Modal Animation
* Table Row Hover

---

# 响应式要求

必须支持：

* Desktop
* Tablet
* Mobile

移动端：

* Drawer Sidebar
* Sticky Header
* Mobile Cards
* Bottom Navigation

---

# Loading 与 Empty State

所有页面必须有：

* Skeleton Loading
* Empty Illustration
* Error State
* Retry Button

---

# 高级功能

额外高级功能：

* Real-time Dashboard
* Live Notifications
* Activity Logs
* Audit Trails
* Role Permission Matrix
* Multi-language Support
* Myanmar Font Support
* QR Invoice
* Printable Receipt
* Backup & Restore
* Offline Cache
* PWA Support

---

# 生成要求

生成完整项目：

* 完整 React + Vite 项目结构
* TypeScript 类型
* API 服务层
* Zustand Store
* Layout 系统
* 响应式 UI
* Tailwind 配置
* 所有页面
* 所有组件
* 所有 Modal
* 所有 Table
* 所有 Charts
* 登录权限系统
* Mock Data
* 示例 Dashboard
* Dark Mode
* Loading 状态
* 完整 CRUD
* 现代化 SaaS UI

所有页面必须具备真实企业级交互，而不是简单静态页面。
