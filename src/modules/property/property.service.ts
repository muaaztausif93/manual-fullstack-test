import enrollmentService from '../enrollment/enrollment.service';
import openHouseService from '../openHouse/openHouse.service';
import { PropertyRepository } from './property.repository';

class PropertyService {
  public propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  public createProperty = async (address: string) => {
    try {
      const property = await this.propertyRepository.createProperty({address});
      await openHouseService.createOpenHouse({
        visitorAmount: 5,
        propertyId: property.id,
        startDate: new Date()
      })
  
      return property;
    } catch (error) {
      throw new Error('property already created')
    }
  };

  public getProperties = async () => {
    return await this.propertyRepository.getProperties();
  };

  public getPropertyDetails = async (id: number) => {
    try {
      const property = await this.propertyRepository.getProperty(id);
      const openHouse = await openHouseService.getOpenHouse(Number(property?.id));
      const enrolledPropertyUsers = await enrollmentService.getEnrollmentUsersByPropertyId(Number(property?.id));
      return {
        property: property,
        enrolledPropertyUsers: enrolledPropertyUsers,
        openHouse: openHouse
      }
    } catch (error) {
      throw new Error('Something wrong with get property details')
    }
  };
}

export default new PropertyService();
