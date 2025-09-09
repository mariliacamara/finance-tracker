import { Module } from '@nestjs/common'
import { PrismaModule } from './infra/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ExpensesModule
  ]
})
export class AppModule {}
