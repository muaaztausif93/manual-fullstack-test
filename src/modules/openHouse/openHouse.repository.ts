import { OpenHouse } from './openHouse.model'
import { OpenHouseType } from './openHouse.types';

export class OpenHouseRepository {
    async getOpenHouse(propertyId: string | number) {
        const openHouse = await OpenHouse.query().findOne({
            propertyId: propertyId
        });
        return openHouse;
    }

    async createOpenHouse(openHouseParams: Partial<OpenHouseType>) {
        const openHouse = await OpenHouse.query()
            .insert({ 
                ...openHouseParams
            }).returning('*')
        return openHouse;
    }
}