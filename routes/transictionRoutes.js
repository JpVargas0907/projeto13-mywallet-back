import { Router } from 'express';
import { catchTransictions, registerTransiction } from '../controllers/transictionController.js';

import { userMiddleware } from '../middleware/userMiddleware.js';

const router = Router();

router.get('/transictions', userMiddleware, catchTransictions);
router.post('/transictions', userMiddleware, registerTransiction);

export default router;