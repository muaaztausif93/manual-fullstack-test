import { OpenHouse } from '../openHouse/openHouse.model';
import { Enrollments } from './enrollment.model'

export class EnrollmentRepository {
    async  enrollUser(userId: string | number, openHouseId: string | number) {
        const enrollment = await Enrollments.query().insert({
            userId: userId,
            openHouseId: openHouseId
        });
        return enrollment;
    }

    async unenrollUser(userId: string | number, openHouseId: string | number) {
        const enrollment = await Enrollments.query()
            .where({ 
                userId, 
                openHouseId 
            })
            .delete();
        return enrollment;
    }

    async getEnrollmentOfOpenHouseId(openHouseId: number) {
        const enrolledVisitors = await Enrollments.query().where({
            openHouseId
        });
        return enrolledVisitors;
    }

    async getEnrollmentUsersByPropertyId(openHouseId: number) {
        return await Enrollments.query().where({ openHouseId }).withGraphJoined('user')
    }
}