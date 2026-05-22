import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { AdminRole } from '../admins/entities/admin.entity';

dotenv.config({ path: join(process.cwd(), '.env') });

async function init() {
  console.log('Connecting to database...');

  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'sagu_net',
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: true,
  });

  await dataSource.initialize();
  console.log('Database tables created successfully');

  const adminRepo = dataSource.getRepository('Admin');
  const settingRepo = dataSource.getRepository('Setting');

  const adminExists = await adminRepo.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await adminRepo.save({
      username: 'admin',
      password: hashedPassword,
      name: 'Super Admin',
      email: 'admin@sagunet.com',
      phone: '09123456789',
      role: AdminRole.SUPER_ADMIN,
      is_active: true,
    });
    console.log('Admin user created: admin / admin123');
  } else {
    console.log('Admin user already exists');
  }

  const defaultSettings = [
    { key: 'company_name', value: 'Sagu Net ISP' },
    { key: 'company_logo', value: '' },
    { key: 'invoice_prefix', value: 'SN-' },
    { key: 'currency', value: 'MMK' },
    { key: 'timezone', value: 'Asia/Yangon' },
    { key: 'dark_mode', value: 'false' },
    { key: 'sms_enabled', value: 'false' },
    { key: 'whatsapp_enabled', value: 'false' },
  ];

  for (const s of defaultSettings) {
    const exists = await settingRepo.findOne({ where: { key: s.key } });
    if (!exists) {
      await settingRepo.save(s);
    }
  }
  console.log('Default settings created');

  await dataSource.destroy();
  console.log('Database initialization completed successfully!');
}

init().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
