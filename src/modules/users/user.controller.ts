import { Router, Request, Response } from 'express';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import UserService from './user.service';

export class UserController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getUser = async (req: Request, res: Response) => {
    if (req.body.email) {
      const user = await this.userService.getOneUser(req.body.email);
      if (user) {
        res.status(200).send({
          error: false,
          ...user,
        });
      } else {
        res.status(402).send({
          error: true,
          message: 'Email does not exists',
        });
      }
    } else {
      res.status(402).send({
        error: true,
        message: 'Email does not exists',
      });
    }
  };

  public getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    if (users) {
      res.status(200).send({
        error: false,
        data: [...users],
      });
    } else {
      res.status(402).send({
        error: true,
        message: 'Something wrong with getting users',
      });
    }
  };

  public routes() {
    this.router.get('/', this.getUser);
    this.router.get('/getAll', this.getAllUsers)
    return this.router;
  }
}
