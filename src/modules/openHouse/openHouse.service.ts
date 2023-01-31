import { OpenHouseRepository } from './openHouse.repository';
import { OpenHouseType } from './openHouse.types';

class OpenHouseService {
  public openHouseRepository: OpenHouseRepository;

  constructor() {
    this.openHouseRepository = new OpenHouseRepository();
  }

  public createOpenHouse = async (openHouseParams: Partial<OpenHouseType>) => {
    return await this.openHouseRepository.createOpenHouse(openHouseParams);
  };

  public getOpenHouse = async (propertyId: string | number) => {
    return await this.openHouseRepository.getOpenHouse(propertyId);
  };
}

export default new OpenHouseService();
