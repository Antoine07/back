"use strict";

import express from "express"
import { play , index } from "./controllers/gameController";
import { gameMiddleware } from "./middlewares/gameMiddleware";
const router = express.Router();

router.use((req, res, next) =>{ next() });

router.get('/', (req, res) => index(req, res) );
router.get('/play', (req, res) => play(req, res));

export default router;