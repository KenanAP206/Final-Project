import express from 'express';
import { EpisodeController } from '../Controllers/EpisodeController.js';
import { EpisodeMiddleware } from '../Middlewares/EpisodeMiddleware.js';

const router = express.Router();

router.get("/", EpisodeController.getAll);
router.get("/:id", EpisodeController.getById);
router.get("/shows/:id", EpisodeController.getShowEpisodes);
router.delete("/:id", EpisodeController.deleteEpisode);
router.post("/", EpisodeMiddleware, EpisodeController.postEpisode);
router.put("/:id", EpisodeController.updateEpisode);

export const EpisodeRouter = router;