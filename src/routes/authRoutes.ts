import Router from 'koa-router';
import { AuthController } from '../controllers/AuthController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userRegisterSchema, userLoginSchema } from '../services/validationService';

const router = new Router({ prefix: '/user' });

router.post('/login', validateRequestBody(userLoginSchema), AuthController.login);
router.post('/register', validateRequestBody(userRegisterSchema), AuthController.register);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.get('/activate/:link', AuthController.activate);
router.get('/get-all', AuthController.getAllUsers);

export default router;
