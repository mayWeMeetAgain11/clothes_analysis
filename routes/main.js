import express from "express";
const router = express.Router();

import { index, result } from '../controllers/mainController.js';

router.get('/', index);
router.post('/', result);

export default router;
