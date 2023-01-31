import { User } from './user.model';
import { UserType } from './user.types';

export class UserRepository {
  async getAllUsers() {
    return await User.query();
  }

  async getUser(email: string) {
    return await User.query().findOne({
      email,
    });
  }

  async createUser(userData: Partial<UserType>) {
    return await User.query().insert(userData);
  }
}
