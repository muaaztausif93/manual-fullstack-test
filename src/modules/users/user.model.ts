import { Model } from 'objection';
import { UserType } from './user.types';
import { Enrollments } from '../enrollment/enrollment.model'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends UserType {}
// eslint-disable-next-line no-redeclare

export class User extends Model {
    static tableName = 'user'

    static relationMappings() {
        return {
            enrollments: {
                relation: Model.HasManyRelation,
                modelClass: Enrollments,
                join: {
                    from: 'user.id',
                    to: 'enrollment.user_id'
                }
            }
        };
    }
}