import express from 'express';
import { getMessagesByDoc } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:docId', getMessagesByDoc);

export default router;
