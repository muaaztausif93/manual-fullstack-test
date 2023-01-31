import { Model } from 'objection';
import { PropertyType } from './property.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Property extends PropertyType {}
// eslint-disable-next-line no-redeclare

export class Property extends Model {
    static tableName = 'property';
}