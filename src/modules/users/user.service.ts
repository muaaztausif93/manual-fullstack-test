import { UserRepository } from './user.repository';
import { UserType } from './user.types';

class UserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getOneUser = async (email: string) => {
    return await this.userRepository.getUser(email);
  };

  public addUser = async (userData: Partial<UserType>) => {
    return await this.userRepository.createUser(userData);
  };

  public getAllUsers = async () => {
    return await this.userRepository.getAllUsers();
  }
}

export default new UserService();
