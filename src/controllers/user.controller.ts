import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findAllUsers();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({ "Error": err });
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findUserById(req.params.id!);
    if (!result) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({ "Error": err });
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createUser(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(401).json({ "Error": err });
  }
};  

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateUser(req.params.id!, req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(401).json({ "Error": err });
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.deleteUser(req.params.id!);
    return res.status(204).json(result);
  } catch (err) {
    return res.status(401).json({ "Error": err });
  }
};
