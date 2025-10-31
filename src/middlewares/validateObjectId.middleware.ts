import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = (params = 'id') => (req: Request, res: Response, next: NextFunction) => {
  try {
    const value = req.params[params];
    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({ message: `Invalid ObjectId for parameter '${params}'` });//400 Bad Request
    }
    return next();
  } catch (err) {
    return res.status(400).json({ message: `Error validating ObjectId for parameter '${params}'`, error: err });
  }
};
