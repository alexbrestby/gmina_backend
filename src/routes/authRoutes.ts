import Router from 'koa-router';
import { AuthController } from '../controllers/AuthController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userRegisterSchema, userLoginSchema } from '../services/validationService';

const router = new Router({ prefix: '/user' });

/**
 * POST /user/login
 * Route to log in a user
 * @name login
 * @function
 * @memberof module:routers/userRouter
 * @param {Function} validateRequestBody - Middleware to validate the request body
 * @param {Object} userLoginSchema - Schema for validating user login data
 * @param {Object} AuthController.login - Controller method for logging in a user
 */
router.post('/login', validateRequestBody(userLoginSchema), AuthController.login);

/**
 * POST /user/register
 * Route to register a new user
 * @name register
 * @function
 * @memberof module:routers/userRouter
 * @param {Function} validateRequestBody - Middleware to validate the request body
 * @param {Object} userRegisterSchema - Schema for validating user registration data
 * @param {Object} AuthController.register - Controller method for registering a user
 */
router.post('/register', validateRequestBody(userRegisterSchema), AuthController.register);

/**
 * POST /user/logout
 * Route to log out a user
 * @name logout
 * @function
 * @memberof module:routers/userRouter
 * @param {Object} AuthController.logout - Controller method for logging out a user
 */
router.post('/logout', AuthController.logout);

/**
 * POST /user/refresh
 * Route to refresh a user's authentication token
 * @name refresh
 * @function
 * @memberof module:routers/userRouter
 * @param {Object} AuthController.refresh - Controller method for refreshing authentication token
 */
router.post('/refresh', AuthController.refresh);

/**
 * GET /user/activate/:link
 * Route to activate a user's account
 * @name activate
 * @function
 * @memberof module:routers/userRouter
 * @param {Object} AuthController.activate - Controller method for account activation
 */
router.get('/activate/:link', AuthController.activate);

/**
 * GET /user/get-all
 * Route to get all users
 * @name getAllUsers
 * @function
 * @memberof module:routers/userRouter
 * @param {Object} AuthController.getAllUsers - Controller method to get all users
 */
router.get('/get-all', AuthController.getAllUsers);

export default router;