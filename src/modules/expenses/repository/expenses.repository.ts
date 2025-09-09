import { Injectable } from '@nestjs/common';
import { PrismaService } from '#/infra/prisma/prisma.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Injectable()
export class ExpensesRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateExpenseDto) {
    const { installments, totalAmount, firstDueDate, ...base } = dto;
    const each = Number((totalAmount / installments).toFixed(2));

    const expense = await this.prisma.expense.create({
      data: { ...base, totalAmount, installments, userId },
    });

    const start = new Date(firstDueDate);
    const rows = Array.from({ length: installments }).map((_, i) => {
      const due = new Date(start);
      due.setMonth(due.getMonth() + i);
      return {
        expenseId: expense.id,
        installmentNumber: i + 1,
        amount: each,
        dueDate: due,
        status: 'SCHEDULED' as const,
      };
    });

    await this.prisma.expenseInstallment.createMany({ data: rows });
    return expense;
  }

  listByMonth(userId: string, month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return this.prisma.expenseInstallment.findMany({
      where: {
        expense: { userId },
        dueDate: { gte: start, lte: end },
      },
      orderBy: [{ dueDate: 'asc' }, { installmentNumber: 'asc' }],
      include: { expense: true },
    });
  }
}
