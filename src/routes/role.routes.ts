import { Router } from "express";
import * as roleCtrl from "../controllers/role.controller";
import { validate } from "../middlewares/validate.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { createRoleSchema, updateRoleSchema } from "../validators/role.validator";

const router = Router();

router.get("/", roleCtrl.list);
router.post("/", validate(createRoleSchema), roleCtrl.create);
router.put("/:id", validateObjectId('id'), validate(updateRoleSchema), roleCtrl.update);
router.delete("/:id", validateObjectId('id'), roleCtrl.remove);

export default router;
