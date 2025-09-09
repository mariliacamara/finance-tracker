import { ExpenseType, ExpenseCategory } from "#/common/types/expense.type";
import { PaymentMethod } from "#/common/types/payment.type";

export class CreateExpenseDto {
  description?: string;
  totalAmount!: number;
  type!: ExpenseType;
  category!: ExpenseCategory;
  paymentMethod!: PaymentMethod;
  installments!: number;
  firstDueDate!: string;
}
