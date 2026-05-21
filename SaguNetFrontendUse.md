创建一个全新的 frontend_user 官网项目文件夹，位置：

root/
├── frontend_admin/
├── frontend_user/
├── backend/

frontend_user 是公司官网，不是后台管理系统。

技术栈要求：

- React
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- lucide-react
- react-router-dom
- shadcn/ui
- swiper
- react-countup
- react-intersection-observer

官网风格：

- 现代化 ISP 企业官网
- 类似 Starlink / Huawei / Tesla / Stripe / Cloudflare 风格
- 高级科技感
- 深色科技蓝 + 渐变
- 大量动画
- 玻璃拟态
- 大圆角
- 动态光效
- 企业级品牌感
- 响应式
- 高级排版
- 大量 Hero Section
- Fullscreen Sections
- Smooth Scroll
- Reveal Animation
- 星空背景 / 网络线条背景 / Glow Effect

目标：

这是 Sagu Net 的官方官网，用于展示：

- 公司品牌
- ISP 宽带服务
- 网络覆盖
- 公司发展
- 企业未来
- 联系方式
- 公司介绍
- 服务优势
- 技术能力
- 合作伙伴
- 招聘
- 新闻动态

必须像真正大型科技公司官网。

-----------------------------------

# 网站页面结构

frontend_user/src/pages/

- HomePage
- AboutPage
- ServicesPage
- CoveragePage
- PricingPage
- CareersPage
- NewsPage
- ContactPage
- TermsPage
- PrivacyPage
- NotFoundPage

-----------------------------------

# Layout

创建：

- MainLayout
- Navbar
- Footer
- MobileMenu
- ScrollProgress
- FloatingContactButton

-----------------------------------

# Navbar

顶部导航栏：

左侧：
- 公司 Logo
- Sagu Net

中间：
- Home
- About
- Services
- Coverage
- Pricing
- Careers
- News
- Contact

右侧：
- Login 按钮（跳转 frontend_admin）
- Get Started 按钮

功能：

- Sticky Navbar
- 滚动后背景模糊
- Active Link
- Hover 动画
- Mobile Drawer Menu
- Smooth Scroll

使用 lucide-react 图标。

-----------------------------------

# 首页 HomePage

创建超高级科技风首页。

-----------------------------------

# Hero Section

全屏 Hero。

背景：

- 星空
- 粒子动画
- 网络连接线
- Glow Background
- Animated Gradient

左侧：

标题：
“Building The Future Of Internet Connectivity”

副标题：
“High-speed fiber internet solutions for homes, businesses, and smart communities.”

按钮：

- Explore Services
- View Coverage

右侧：

- 3D 网络插画
- ISP Dashboard Mockup
- Floating Glass Cards
- Animated Statistics

动画：

- Framer Motion
- Floating Effects
- Fade In
- Blur Reveal
- Scroll Animation

-----------------------------------

# Statistics Section

显示：

- Active Customers
- Fiber Coverage
- Network Speed
- Villages Connected
- Support Availability

使用：

- CountUp Animation
- 渐变卡片
- Hover Glow

-----------------------------------

# About Company Section

展示：

- 公司成立故事
- 公司发展
- 愿景
- 使命
- 企业价值

布局：

左侧：
- 公司图片

右侧：
- 文本内容
- 时间线 Timeline

-----------------------------------

# Services Section

展示 ISP 服务：

- Fiber Internet
- Business Network
- Enterprise Solutions
- CCTV & Security
- Network Installation
- Smart Community

每个服务卡片：

- Icon
- Description
- Learn More
- Hover Animation

-----------------------------------

# Coverage Section

创建高级地图展示。

使用：

- react-leaflet
- animated markers
- glow effect

功能：

- 显示网络覆盖区域
- Coverage Statistics
- Active Regions
- Connected Users

旁边显示：

- 网络稳定性
- Ping
- Uptime
- Speed

-----------------------------------

# Pricing Section

创建高级 Pricing Cards。

套餐：

- Basic
- Standard
- Premium
- Enterprise

每个卡片：

- Speed
- Price
- Features
- Popular Badge
- CTA Button

动画：

- Hover Scale
- Glow Border
- Gradient Background

-----------------------------------

# Future Vision Section

展示公司未来景象。

内容：

- Smart City
- AI Network Management
- 5G Integration
- Fiber Expansion
- Smart Villages
- Cloud Infrastructure

使用：

- Fullscreen futuristic section
- Animated background
- Floating UI
- Network animations

-----------------------------------

# Why Choose Us Section

展示优势：

- 99.9% uptime
- Fast Support
- Affordable Pricing
- Enterprise Security
- Fiber Infrastructure
- 24/7 Monitoring

UI：

- Bento Grid
- Large Cards
- Animated Icons

-----------------------------------

# Testimonials Section

客户评价：

- 家庭用户
- 企业用户
- 学校
- 商店

使用：

- Swiper Carousel
- Glass Cards
- Avatar
- Star Ratings

-----------------------------------

# Careers Page

招聘页面。

显示：

- Open Positions
- Benefits
- Work Culture
- Team Environment

职位：

- Network Engineer
- Technician
- Customer Support
- Finance Officer
- Marketing Specialist

功能：

- Apply Button
- Upload CV
- Career Form

-----------------------------------

# News Page

公司新闻系统。

显示：

- 公司更新
- 网络扩展
- 活动
- 公告

UI：

- Blog Cards
- Featured News
- Search
- Category Filter

-----------------------------------

# Contact Page

创建高级联系页面。

左侧：

- Contact Info
- Email
- Phone
- Address
- Working Hours

右侧：

- Contact Form

字段：

- Name
- Email
- Phone
- Subject
- Message

功能：

- Validation
- Toast
- Submit Loading

底部：

- Google Map / Leaflet Map

-----------------------------------

# Footer

包含：

- Logo
- Quick Links
- Services
- Social Media
- Contact Info
- Copyright
- Terms
- Privacy Policy

-----------------------------------

# 动画要求

全站必须使用：

- Framer Motion
- Scroll Reveal
- Parallax
- Floating Animation
- Gradient Animation
- Glow Hover
- Blur Transition
- Smooth Scrolling

-----------------------------------

# 响应式要求

必须支持：

- Desktop
- Tablet
- Mobile

移动端：

- Mobile Menu
- Touch Friendly
- Optimized Hero
- Responsive Typography

-----------------------------------

# SEO

必须：

- Meta Tags
- Open Graph
- Sitemap
- robots.txt
- Structured Data
- SEO Headings

-----------------------------------

# 性能优化

必须：

- Lazy Loading
- Code Splitting
- Optimized Images
- Skeleton Loading
- Route-based Splitting

-----------------------------------

# 文件结构

frontend_user/src/

- assets/
- components/
- sections/
- pages/
- layouts/
- routes/
- hooks/
- services/
- constants/
- animations/
- data/
- styles/

-----------------------------------

# UI 风格参考

风格参考：

- Stripe
- Starlink
- Cloudflare
- Vercel
- Linear
- Tesla
- Huawei Enterprise

-----------------------------------

# 最终目标

生成一个真正商业级 ISP 公司官网：

- 高级科技感
- 企业品牌感
- 动态动画
- 现代化 SaaS 风格
- 高端互联网公司视觉
- 完整响应式
- 极致 UI/UX
- 真实企业官网体验

必须不是普通模板网站，而是具有未来科技感的大型互联网公司官网。
