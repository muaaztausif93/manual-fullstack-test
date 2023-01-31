import { Router, Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import UserService from '../users/user.service';
import {
  userSignInSchema,
  userSignUpSchema,
} from '../users/user.types';

export class AuthController {
  public router: Router;
  public authService = AuthService;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // eslint-disable-next-line consistent-return

  /**
   * This signUp is only for admin signUp route at first time
   * we then use signIn for that admin later.
   * @param req - name, password, email, type required here
   * @param res 
   * @param next 
   */
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const schemaValidation = userSignUpSchema.safeParse(req.body);

    if (schemaValidation.success) {
      // eslint-disable-next-line prefer-const
      let { name, password, email, type } = req.body;

      const userAttr = [];
      userAttr.push({ Name: 'email', Value: email });
      userAttr.push({ Name: 'custom:type', Value: type });

      try {
        const data: any = await this.authService.signUpUser(email, password, userAttr);
        if (!data.error) {
          if (!!data?.UserConfirmed && !!data?.UserSub) {
            try {
              await this.userService.addUser({
                email,
                name,
                type: type
              });
              next();
            } catch (error: any) {
              res.status(500).json({
                error: true,
                message: error.message,
              });
            }
          }
        } else {
          res.status(403).json({
            error: true,
            ...data,
          });
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        errorFields: schemaValidation.error.errors.map((error) => error.path[0]),
      });
    }
  };

  /**
   * This is signIn route for admin user
   * @param req - password, email required here
   * @param res 
   */
  public signIn = async (req: Request, res: Response) => {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    const schemaValidation = userSignInSchema.safeParse(body);
    if (schemaValidation.success) {
      const { email, password } = body;
      try {
        const data: any = await this.authService.signInUser(email, password);
        if (!data.error) {
          res.status(200).json({
            error: false,
            ...data,
          });
        } else {
          res.status(403).json({
            error: true,
            ...data,
          });
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    } else if (!schemaValidation.success) {
      res.status(400).send({
        error: true,
        zodError: true,
        errorFields: schemaValidation.error.errors.map((error) => error.path[0]),
      });
    }
  };

  public routes() {
    this.router.post('/signUp', this.signUp, this.signIn);
    this.router.post('/signIn', this.signIn);
    return this.router;
  }
}
