import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesRepository } from './repository/expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(private expensesRepository: ExpensesRepository) {}

  async create(userId: string, dto: CreateExpenseDto) {
    return this.expensesRepository.create(userId, dto)
  }

  async listByMonth(userId: string, month: number, year: number) {
    return this.expensesRepository.listByMonth(userId, month, year)
  }
}
