import { useEffect, useState } from 'react'
import {
  Users,
  UserX,
  DollarSign,
  Receipt,
  TrendingUp,
  RefreshCw,
  Download,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { dashboardService } from '@/services/dashboard.service'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TableSkeleton } from '@/components/ui/Skeleton'
import { formatCurrency } from '@/utils/format'

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

type DateRange = 'today' | 'yesterday' | 'week' | 'month' | 'custom'

interface SummaryData {
  activeUsers: number
  expiredUsers: number
  suspendedUsers: number
  totalUsers: number
  revenue: number
  expense: number
  profit: number
  dailyRenewals: number
}

interface ChartResponse {
  monthlyRevenue: { month: string; revenue: number }[]
  monthlyExpenses: { month: string; expense: number }[]
  packageStats: { name: string; count: number }[]
}

interface ActivityItem {
  id: string
  title: string
  description: string
  amount?: number
  createdAt: string
}

const ACTIVITY_TITLES: Record<string, string> = {
  renewal: 'Subscription Renewed',
  new_user: 'New User',
  expense: 'Expense Recorded',
  installation: 'New Installation',
}

export function DashboardPage() {
  const [stats, setStats] = useState<SummaryData | null>(null)
  const [charts, setCharts] = useState<{
    revenueExpense: { name: string; revenue: number; expense: number }[]
    dailyRenewals: { name: string; value: number }[]
    packageDistribution: { name: string; value: number }[]
    userStatus: { name: string; value: number }[]
    monthlyProfit: { name: string; value: number }[]
  } | null>(null)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>('month')

  const load = async () => {
    setLoading(true)
    try {
      const [summaryData, chartsData, rawActivities] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getCharts(),
        dashboardService.getRecentActivities(),
      ])

      setStats(summaryData)
      setCharts({
        revenueExpense: chartsData.monthlyRevenue.map((m, i) => ({
          name: m.month,
          revenue: m.revenue,
          expense: chartsData.monthlyExpenses[i]?.expense ?? 0,
        })),
        dailyRenewals: [{ name: 'Today', value: summaryData.dailyRenewals }],
        packageDistribution: chartsData.packageStats.map((p) => ({ name: p.name, value: p.count })),
        userStatus: [
          { name: 'Active', value: summaryData.activeUsers },
          { name: 'Expired', value: summaryData.expiredUsers },
          { name: 'Suspended', value: summaryData.suspendedUsers },
        ],
        monthlyProfit: chartsData.monthlyRevenue.map((m, i) => ({
          name: m.month,
          value: m.revenue - (chartsData.monthlyExpenses[i]?.expense ?? 0),
        })),
      })
      setActivities(
        rawActivities.map((a) => ({
          id: a.id,
          title: ACTIVITY_TITLES[a.type] ?? 'Activity',
          description: a.user + (a.package ? ` - ${a.package}` : ''),
          amount: a.amount,
          createdAt: a.date,
        }))
      )
    } catch {
      toast.error('Failed to load dashboard data')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [dateRange])

  const handleExport = (type: string) => {
    toast.success(`${type} export started`)
  }

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <TableSkeleton rows={2} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
          ))}
        </div>
      </div>
    )
  }

  if (!stats || !charts) return null

  const statCards = [
    { title: 'Active Users', value: stats.activeUsers, icon: Users, gradient: true },
    { title: 'Expired Users', value: stats.expiredUsers, icon: UserX },
    { title: 'Suspended Users', value: stats.suspendedUsers, icon: UserX },
    { title: 'Total Users', value: stats.totalUsers, icon: Users },
    { title: 'Total Revenue', value: stats.revenue, icon: DollarSign, isCurrency: true, gradient: true },
    { title: 'Total Expense', value: stats.expense, icon: Receipt, isCurrency: true },
    { title: 'Net Profit', value: stats.profit, icon: TrendingUp, isCurrency: true },
  ]

  return (
      <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="ISP analytics and business overview"
        actions={
          <>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm dark:border-slate-600 dark:bg-slate-800"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('Excel')}>
              <Download className="h-4 w-4" /> Excel
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">Revenue vs Expense</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={charts.revenueExpense}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f680" />
              <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#ef444480" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold">Daily Renewals</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={charts.dailyRenewals}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold">Package Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={charts.packageDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {charts.packageDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold">Active vs Inactive Users</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={charts.userStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold">Monthly Profit</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={charts.monthlyProfit}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98140" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 font-semibold">Recent Activities</h3>
        <div className="space-y-3">
          {activities.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-800">
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-slate-500">{a.description}</p>
              </div>
              <div className="text-right text-sm">
                {a.amount && <p className="font-medium text-emerald-600">{formatCurrency(a.amount)}</p>}
                <p className="text-slate-400">{dayjs(a.createdAt).format('DD MMM, HH:mm')}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
