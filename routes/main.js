import express from "express";
const router = express.Router();

import { index } from '../controllers/mainController';

router.get('/', index);

export default router;
