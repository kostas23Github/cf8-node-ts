import Role, { IRole } from "../models/role.model";

export const findAllRoles = async () => {
  return await Role.find().lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents.
  // db.roles.find() same cmd in MongoDB shell.
};

export const createRole = async (payload: Partial<IRole>) => {
  const result = new Role(payload);
  return result.save();
};

export const updateRole = async (id: string, payload: Partial<IRole>) => {
  return await Role.findByIdAndUpdate(id, payload, { new: true });
  // new: true -> create a new document if none is found.
};

export const deleteRole = async (id: string) => {
  return await Role.findByIdAndDelete(id);
};