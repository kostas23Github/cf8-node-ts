import { Schema, model, Document, Types } from "mongoose";

export interface IPhone {
  type: string;
  number: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhone[];
  roles: Types.ObjectId[];
}

const PhoneSchema = new Schema<IPhone>({
  type: String,
  number: String,
});

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is a required field."],
      unique: true,
      min: 4,
      max: 100,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    firstname: String,
    lastname: { type: String },
    email: { type: String, index: true },
    address: {
      // Can be implemented as PhoneSchema.
      area: String,
      street: String,
      number: String,
      po: String,
      municipality: String,
    },
    phone: { type: [PhoneSchema], null: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
