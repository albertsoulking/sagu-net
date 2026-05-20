import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { UsersPage } from '@/pages/UsersPage'
import { SubscriptionsPage } from '@/pages/SubscriptionsPage'
import { PackagesPage } from '@/pages/PackagesPage'
import { RegionsPage } from '@/pages/RegionsPage'
import { EmployeesPage } from '@/pages/EmployeesPage'
import { ExpensesPage } from '@/pages/ExpensesPage'
import { IncomeChangesPage } from '@/pages/IncomeChangesPage'
import { InstallationRulesPage } from '@/pages/InstallationRulesPage'
import { SubscriptionRulesPage } from '@/pages/SubscriptionRulesPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <AppLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'subscriptions', element: <SubscriptionsPage /> },
      { path: 'packages', element: <PackagesPage /> },
      { path: 'regions', element: <RegionsPage /> },
      { path: 'employees', element: <EmployeesPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'income-changes', element: <IncomeChangesPage /> },
      { path: 'installation-rules', element: <InstallationRulesPage /> },
      { path: 'subscription-rules', element: <SubscriptionRulesPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
