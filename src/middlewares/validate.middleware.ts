import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Middleware to validate request body against a Zod schema, implements two callbacks.
// Instead of type "any"(bad practice), I should use <createUserSchema> etc types down below. In my case though, this isn't the best way since all schemas are the same, so I would have to create multiple zod schemas like this one but with different type tag. NOTE -> SHOULD CHECK THIS LATER TO SEE IF WHAT THE TEACHER SAID(THIS) IS CORRECT.
export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const toValidate = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    schema.parse(toValidate.body);
    return next();
  } catch (err) {
    return res.status(400).json({ message: "Problem in form data", error: err })
  }
}