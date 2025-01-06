import express from "express";
const router = express.Router();

import  {createMovie, getAllMovies } from '../controllers/movieController.js';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.get('/all-movies', getAllMovies);
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);

export default router;