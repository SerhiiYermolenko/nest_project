import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserManagementDocument extends AbstractDocument {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  userId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  createdBy: string;
  @Prop()
  updatedBy: string;
}

export const UserManagementSchema = SchemaFactory.createForClass(
  UserManagementDocument,
);
