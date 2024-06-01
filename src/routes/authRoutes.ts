import Router from 'koa-router';
// import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/AuthController';

const router = new Router({ prefix: '/user' });

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.get('/activate/:link', AuthController.activate);
router.get('/get-all', AuthController.getAllUsers);

export default router;
