import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserManagementDocument } from '../../../../apps/user-management/src/models/user-management.schema';

const getUserByContext = (
  context: ExecutionContext,
): UserManagementDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getUserByContext(context),
);
