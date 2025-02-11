import express from 'express';
import {EpisodeController} from '../Controllers/EpisodeController.js';
import {EpisodeMiddleware} from '../Middlewares/EpisodeMiddleware.js'
export const EpisodeRouter = express.Router();

EpisodeRouter.get("/", EpisodeController.getAll);
EpisodeRouter.get("/:id", EpisodeController.getById);
EpisodeRouter.get("/shows/:id",EpisodeController.getShowEpisodes)
EpisodeRouter.delete("/:id", EpisodeController.deleteEpisode);
EpisodeRouter.post("/",EpisodeMiddleware, EpisodeController.postEpisode);
EpisodeRouter.put("/:id", EpisodeController.updateEpisode);