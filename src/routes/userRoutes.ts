import Router from 'koa-router';
import { UserController } from '../controllers/userController';

const router = new Router();

router.post('/check-user', UserController.checkUser);

export default router;
