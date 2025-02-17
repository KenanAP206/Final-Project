import express from 'express';
import { UserController } from '../Controllers/UserController.js';

export const userRouter = express.Router();

// Kullanıcı listesi alma
userRouter.get("/", UserController.getList);

// Tek bir kullanıcıyı alma
userRouter.get("/:id", UserController.getOne);

// Kullanıcı kaydı
userRouter.post("/register", UserController.register);

// Kullanıcı girişi
userRouter.post("/login", UserController.login);

// Onay kodu doğrulama
userRouter.post("/confirm", UserController.confirm);

// Kullanıcı güncelleme
userRouter.put("/:id", UserController.update);

// Kullanıcı silme
userRouter.delete("/:id", UserController.delete);

// Birden fazla kullanıcı silme
userRouter.delete("/", UserController.deleteMany);

// Kullanıcı oturum kontrolü
userRouter.get("/check-auth", UserController.checkAuth); 