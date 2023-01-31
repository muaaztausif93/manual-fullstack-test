import { Router, Request, Response } from 'express';
import { adminUserGuard } from '../../middlewares/adminUserGuard';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import PropertyService from './property.service';

export class PropertyController {
  public router: Router;
  public propertyService = PropertyService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * admin will create property only simple user cannot create that
   * @param req address: property address
   * @param res 
   */
  public createProperty = async (req: Request, res: Response) => {
    try {
        const address = req.body.address;
        const createdProperty = await this.propertyService.createProperty(address)
        res.status(200).send({
            error: false,
            message: 'Property is created',
            data: createdProperty
        })
    } catch (error) {
      res.status(402).send({
        error: true,
        message: 'Error creating properties'
      });
    }
  };

  /**
   * simple user can access this route also.
   * @param req address: property address
   * @param res 
   */
  public getProperties = async (req: Request, res: Response) => {
    try {
      const allProperties = await this.propertyService.getProperties()
      res.status(200).send({
          error: false,
          message: 'list of all properties fetched',
          data: allProperties
      })
    } catch (error) {
      res.status(402).send({
        error: true,
        message: 'Error fetching all properties'
      });
    }
  }

  /**
   * simple user can access this route also.
   * @param req address: property address
   * @param res 
   */
   public getPropertyDetailsById = async (req: Request, res: Response) => {
    try {
      const propertyDetails = await this.propertyService.getPropertyDetails(Number(req.params.id))
      res.status(200).send({
          error: false,
          message: 'property fetched with open house details',
          data: propertyDetails
      })
    } catch (error) {
        res.status(400).send({
          error: true,
          message: 'Error fetching property details'
        });
    }
  }

  public routes() {
    this.router.get('/', this.getProperties),
    this.router.get('/details/:id', this.getPropertyDetailsById),
    this.router.post('/create', verifyIdToken, adminUserGuard, this.createProperty);
    return this.router;
  }
}
