import { AuthController } from '../modules/auth/auth.controller';
import { UserController } from '../modules/users/user.controller';
import { setUpPem, verifyAccessToken } from '../middlewares/authMiddleware';
import { PropertyController } from '../modules/property/property.controller';
import { EnrollmentController } from '../modules/enrollment/enrollmnt.controller';


const userController = new UserController();
const authController = new AuthController();
const propertyController = new PropertyController();
const enrollmentController = new EnrollmentController();

/**
 *  localhostBasePath: http://localhost:port/api/
 * liveBasePath: https://host-address/api/
 * */ 

export const noAuthRoutes = [
  {
    path: '/user/',
    middleware: [],
    action: userController.routes(),
  },
  {
    path: '/auth/',
    middleware: [],
    action: authController.routes(),
  },
  {
    path: '/property/list/',
    middleware: [],
    action: propertyController.routes(),
  },
];

export const AppRoutes = [
  // setting middleware in routes for this as it partially protected
  {
    path: '/property/',
    middleware: [setUpPem, verifyAccessToken],
    action: propertyController.routes(),
  },
  {
    path: '/enrollment/',
    middleware: [setUpPem, verifyAccessToken],
    action: enrollmentController.routes(),
  }
];
