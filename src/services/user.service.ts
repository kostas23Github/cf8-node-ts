import bcrypt from "bcrypt";
import Role from "../models/role.model";
import User, { IUser } from "../models/user.model";

const SALT_ROUNDS = 10;

export const findAllUsers = async () => {
  return await User.find().populate("roles").lean();  // To implement pagination, add filters inside .find().
};

export const findUserById = async (id: string) => {
  return await User.findById(id).populate("roles").lean();
};

export const createUser = async (payload: Partial<IUser>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }
  
  let reader = await Role.findOne({ role: "READER" });
  if (!reader) {
    reader = await Role.create({ role: "READER", description: "Role Reader", active: true });
  }

  let roleIds = [reader._id];
  const user = new User({ ...payload, roles: roleIds });
  return await user.save();
};

export const updateUser = async (id: string, payload: Partial<IUser>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }

  return await User.findByIdAndUpdate(id, payload, { new: true }).populate("roles");
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};