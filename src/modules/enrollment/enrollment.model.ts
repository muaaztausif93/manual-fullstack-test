import { Model } from 'objection';
import { User } from '../users/user.model'
import { OpenHouse } from '../openHouse/openHouse.model'

export class Enrollments extends Model {
    static tableName = 'enrollment';

    static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'enrollment.user_id',
                    to: 'user.id'
                }
            },
            openHouse: {
                relation: Model.BelongsToOneRelation,
                modelClass: OpenHouse,
                join: {
                    from: 'enrollment.open_house_id',
                    to: 'open_house.id'
                }
            }
        };
    }
}