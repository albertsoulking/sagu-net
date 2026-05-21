import * as bcrypt from 'bcrypt';

export const seedData = async (dataSource: any) => {
  const userRepo = dataSource.getRepository('User');
  const settingRepo = dataSource.getRepository('Setting');

  const adminExists = await userRepo.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await userRepo.save({
      username: 'admin',
      password: hashedPassword,
      role: 'super_admin',
      email: 'admin@sagunet.com',
      phone: '09123456789',
      status: 'active',
      customer_id: 'ADMIN-001',
    });
    console.log('Admin user created: admin / admin123');
  }

  const settings = [
    { key: 'company_name', value: 'Sagu Net ISP' },
    { key: 'invoice_prefix', value: 'SN-' },
    { key: 'currency', value: 'MMK' },
    { key: 'timezone', value: 'Asia/Yangon' },
    { key: 'dark_mode', value: 'false' },
  ];

  for (const s of settings) {
    const exists = await settingRepo.findOne({ where: { key: s.key } });
    if (!exists) {
      await settingRepo.save(s);
    }
  }

  console.log('Seed completed successfully');
};
