import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from '../models';

const getUserByContext = (context: ExecutionContext): UsersDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getUserByContext(context),
);
