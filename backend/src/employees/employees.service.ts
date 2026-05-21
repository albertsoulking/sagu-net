import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async findAll() {
    return this.employeesRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(dto: CreateEmployeeDto, userId?: number) {
    const payableSalary =
      dto.salary + (dto.overtime_rate || 0) + (dto.bonus || 0) - (dto.absent_deduction || 0) - (dto.advance_salary || 0);

    const employee = this.employeesRepository.create({
      ...dto,
      payable_salary: payableSalary,
      created_by: userId,
    });
    return this.employeesRepository.save(employee);
  }

  async update(id: number, dto: UpdateEmployeeDto, userId?: number) {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');

    Object.assign(employee, dto);

    employee.payable_salary =
      (dto.salary ?? employee.salary) +
      (dto.overtime_rate ?? employee.overtime_rate) +
      (dto.bonus ?? employee.bonus) -
      (dto.absent_deduction ?? employee.absent_deduction) -
      (dto.advance_salary ?? employee.advance_salary);

    employee.updated_by = userId;
    return this.employeesRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
    await this.employeesRepository.softDelete(id);
    return { message: 'Employee deleted successfully' };
  }

  async processPayroll() {
    const employees = await this.employeesRepository.find();
    const results = [];

    for (const emp of employees) {
      emp.payable_salary =
        emp.salary + emp.overtime_rate + emp.bonus - emp.absent_deduction - emp.advance_salary;
      await this.employeesRepository.save(emp);
      results.push({
        id: emp.id,
        name: emp.name,
        salary: emp.salary,
        payable: emp.payable_salary,
      });
    }

    return { message: 'Payroll processed', employees: results };
  }
}
