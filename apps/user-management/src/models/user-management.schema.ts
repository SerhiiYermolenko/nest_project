import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserManagementDocument extends AbstractDocument {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  userId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserManagementSchema = SchemaFactory.createForClass(
  UserManagementDocument,
);
