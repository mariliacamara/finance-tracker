import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const id = req.headers['x-user-id'];
  if (typeof id !== 'string' || !id) throw new Error('x-user-id header required');
  return id;
});
