import express from 'express';
import {ShowController} from '../Controllers/ShowController.js';
export const route = express.Router();

route.get("/", ShowController.getAll);
route.get("/:id", ShowController.getById);
route.delete("/:id", ShowController.deleteShow);
route.post("/", ShowController.postShow);
route.put("/:id", ShowController.putShow);