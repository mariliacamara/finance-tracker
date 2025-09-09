import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserId } from '#/common/decorators/user-id.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly svc: ExpensesService) {}

  @Post()
  create(@UserId() userId: string, @Body() dto: CreateExpenseDto) {
    return this.svc.create(userId, dto);
  }

  @Get()
  list(
    @UserId() userId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.svc.listByMonth(userId, Number(month), Number(year));
  }
}
