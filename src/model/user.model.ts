import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
export type DocumentType<T> = T & Document;

export type ModelType<T> = Model<DocumentType<T>>;

export type UserDocument = DocumentType<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: string;
    @Prop({
    type: String,
    required: true,
  
    trim: true
  })
  identity: string;
  @Prop({
    type: String,
    required: true,
  
    trim: true
  })
  mail: string;
  @Prop({
    type: String,
    select: false,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    required: true,
    trim: true
  })
  userName: string;

  @Prop({
    type: Boolean,
    default: true})
  status:boolean;
  @Prop({
    type: String,

  })
  avatar: string;
@Prop(
  {
    type:Boolean,
    default:false

}
)
isDeleted:boolean;
@Prop(
  {
    type:Boolean,
    default:false

}
)
isArchived:boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
