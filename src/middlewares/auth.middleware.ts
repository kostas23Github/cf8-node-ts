import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

declare global {
  namespace Express {
    interface Request { user?: any }  // Extending the Request interface to include the optional user property.
  }
}

// A token is given to the user upon login, in res.body.token(head to Postman/Echo API).
export const authenticate = (req: Request, res: Response, next: NextFunction) => {

  const header = req.headers.authorization; // "Bearer <token>" is in the response from the request inside headers, inside authorization part.
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Missing or invalid Authorization Header' });
  }

  const token = header.split(' ')[1]; // Extract token part from header variable above.
  console.log("Token >>>", token)

  if (!token) { 
    return res.status(401).json({ message: 'Invalid Authorization Format' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Attach the decoded payload to request named user for further use in the request lifecycle.
    // This user type is added to the Request interface at the top of this file.
    console.log("User>>>", req.user);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}