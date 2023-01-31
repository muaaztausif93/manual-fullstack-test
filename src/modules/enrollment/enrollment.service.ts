import openHouseService from '../openHouse/openHouse.service';
import { EnrollmentRepository } from './enrollment.repository';

class EnrollmentService {
  public enrollmentRepository: EnrollmentRepository;

  constructor() {
    this.enrollmentRepository = new EnrollmentRepository();
  }

  public getEnrollmentOfOpenHouseId = async(openHouseId: number) => {
    return await this.enrollmentRepository.getEnrollmentOfOpenHouseId(openHouseId);
  }

  public enrollUser = async (userId: string | number, propertyId: string | number) => {
    const openHouse = await openHouseService.getOpenHouse(propertyId);
    const enrolledVisitors = await this.getEnrollmentOfOpenHouseId(Number(openHouse?.id));
    if (!!openHouse){
      if(openHouse.visitorAmount > enrolledVisitors.length){
        return await this.enrollmentRepository.enrollUser(userId, openHouse.id);
      }else{
        throw new Error("Open house has reached its maximum visitors limit");  
      }
    }else{
      throw new Error("Something went wrong in enrolling user");
    }
  };

  public unenrollUser = async (userId: string | number, propertyId: string | number) => {
    const openHouse = await openHouseService.getOpenHouse(propertyId);
    return await this.enrollmentRepository.unenrollUser(userId, Number(openHouse?.id));
  };

  public getEnrollmentUsersByPropertyId = async(propertyId: number) => {
    const openHouse = await openHouseService.getOpenHouse(propertyId);
    return await this.enrollmentRepository.getEnrollmentUsersByPropertyId(Number(openHouse?.id));
  }
}

export default new EnrollmentService();
