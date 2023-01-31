import { Model } from 'objection';
import { Enrollments } from '../enrollment/enrollment.model';
import { OpenHouseType } from './openHouse.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OpenHouse extends OpenHouseType {}
// eslint-disable-next-line no-redeclare


export class OpenHouse extends Model {
    static tableName = 'open_house';

    static relationMappings() {
        return {
            enrollments: {
                relation: Model.HasManyRelation,
                modelClass: Enrollments,
                join: {
                    from: 'open_house.id',
                    to: 'enrollment.open_house_id'
                }
            }
        };
    }
}