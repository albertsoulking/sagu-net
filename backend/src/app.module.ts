import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RegionsModule } from './regions/regions.module';
import { EmployeesModule } from './employees/employees.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { AdminsModule } from './admins/admins.module';
import { SettingsModule } from './settings/settings.module';
import { UploadsModule } from './uploads/uploads.module';
import { IncomeChangesModule } from './income-changes/income-changes.module';
import { InstallationRulesModule } from './installation-rules/installation-rules.module';
import { SubscriptionRulesModule } from './subscription-rules/subscription-rules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    AdminsModule,
    AuthModule,
    UsersModule,
    PackagesModule,
    SubscriptionsModule,
    RegionsModule,
    EmployeesModule,
    ExpensesModule,
    DashboardModule,
    ReportsModule,
    NotificationsModule,
    AuditLogsModule,
    SettingsModule,
    UploadsModule,
    IncomeChangesModule,
    InstallationRulesModule,
    SubscriptionRulesModule,
  ],
})
export class AppModule {}
