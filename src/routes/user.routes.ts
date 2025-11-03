import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /users:
 *  get:
 *    summary: List of all users
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Response list of users
 */
router.get("/", authenticate, userCtrl.list); // For someone to be able to get the list of users, he/she must be authenticated, meaning having a valid token.
// Add validation middleware only for specific routes.
// Why add it here?
// To aliviate the API from validation logic further down the line(i.e. the db itself), since it can happen right away.
router.get("/:id", validateObjectId('id'), userCtrl.getOne);  // 'id' is redundant here but explicit for clarity.

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Creates a user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *    responses: 
 *      201:
 *        description: User created
 * 
 */
router.post("/", authenticate, validate(createUserSchema), userCtrl.create);
router.put("/:id", authenticate, validate(updateUserSchema), validateObjectId('id'), userCtrl.update);
router.delete("/:id", authenticate, validateObjectId('id'), userCtrl.remove);

export default router;