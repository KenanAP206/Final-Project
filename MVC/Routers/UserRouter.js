import express from 'express';
import { UserController } from '../Controllers/UserController.js';
export const userRouter = express.Router();

userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
userRouter.post("/", UserController.postUser);
userRouter.put("/:id", UserController.putUser);
userRouter.delete("/:id", UserController.deleteUser); 