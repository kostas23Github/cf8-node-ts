import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get("/", authenticate, userCtrl.list);
// Add validation middleware only for specific routes.
// Why add it here?
// To aliviate the API from validation logic further down the line(i.e. the db itself), since it can happen right away.
router.get("/:id", validateObjectId('id'), userCtrl.getOne);  // 'id' is redundant here but explicit for clarity.
router.post("/", authenticate, validate(createUserSchema), userCtrl.create);
router.put("/:id", authenticate, validate(updateUserSchema), validateObjectId('id'), userCtrl.update);
router.delete("/:id", authenticate, validateObjectId('id'), userCtrl.remove);

export default router;