import express from 'express';
import { UserController } from '../Controllers/UserController.js';
export const userRouter = express.Router();

userRouter.get("/", UserController.getList);
userRouter.get("/:id", UserController.getOne);
userRouter.post("/", UserController.create);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);
userRouter.delete("/", UserController.deleteMany); 