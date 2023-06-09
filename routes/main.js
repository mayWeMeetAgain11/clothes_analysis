import express from "express";
const router = express.Router();

import { index } from '../controllers/mainController.js';

router.get('/', index);

export default router;
