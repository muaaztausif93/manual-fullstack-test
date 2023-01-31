import { Router, Request, Response } from 'express';
import { adminUserGuard } from '../../middlewares/adminUserGuard';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import EnrollmentService from './enrollment.service';

export class EnrollmentController {
  public router: Router;
  public enrollmentService = EnrollmentService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public enrollUserEnrollment = async (req: Request, res: Response) => {
    try {
        const { userId, propertyId } = req.body;
        const enrolledUserEnrollment = await this.enrollmentService.enrollUser(userId, propertyId)
        res.status(200).send({
            error: false,
            message: 'User is enrolled by admin user to property',
            data: enrolledUserEnrollment
        })
    } catch (error: any) {
      res.status(402).send({
        error: true,
        message: error?.message || 'Something went wrong in enrolling user'
      });
    }
  };

  public unEnrollUserEnrollment = async (req: Request, res: Response) => {
    try {
      const { userId, propertyId } = req.body;
      const unenrollUserEnrollment = await this.enrollmentService.unenrollUser(userId, propertyId)
      res.status(200).send({
          error: false,
          message: 'User is unEnrolled by admin user from property',
          data: unenrollUserEnrollment
      })
    } catch (error: any) {
      res.status(402).send({
        error: true,
        message: error?.message || 'Something went wrong in enrolling user'
      });
    }
  }

  // Both routes protected by simple user
  public routes() {
    this.router.post('/enroll', verifyIdToken, adminUserGuard, this.enrollUserEnrollment)
    this.router.post('/unenroll', verifyIdToken, adminUserGuard, this.unEnrollUserEnrollment);
    return this.router;
  }
}
