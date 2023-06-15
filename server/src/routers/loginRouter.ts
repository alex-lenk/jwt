import express from 'express';
import * as loginController from '../controllers/loginController';

const router = express.Router();

router.post('/login', loginController.login);
router.post('/verify', loginController.verify);

export default router;
