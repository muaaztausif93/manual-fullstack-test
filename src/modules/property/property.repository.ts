import { raw } from 'objection';
import { Property } from './property.model';
import { PropertyType } from './property.types';

export class PropertyRepository {
  async createProperty(propertyData: Partial<PropertyType>) {
    return await Property.query().insert(propertyData);
  }

  async getProperties() {
    return await Property.query();
  }

  async getProperty(id: number) {
    return await Property.query().findById(id);
  }

  async getRandomProperty() {
    return await Property.query().findOne(raw('random()')); 
  }
}
