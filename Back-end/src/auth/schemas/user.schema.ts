import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ default: 'LOCAL' })
  type: string;

  @Prop()
  displayName: string;

  @Prop()
  username: string;

  @Prop({ default: '' })
  password: string;

  @Prop({
    default: 'http://localhost:5000/api/uploads/avatar/user_avatar_default.png',
  })
  avaUrl: string;

  @Prop({ default: '' })
  contactPhone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  addressDetail: string;

  @Prop({ default: '' })
  facebookId: string;

  @Prop({ default: 'refresh_token' })
  refreshToken: string;

  @Prop({ default: 'access_token' })
  accessToken: string;

  @Prop({ default: 'member' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
