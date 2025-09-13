import {User, UserResponse} from '../models';
import {auth, COLLECTIONS} from '../config/firebase';
import {BaseRepository} from './BaseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findBy('email', email);
    return users.length > 0 ? users[0] : null;
  }

  async createCustomToken(user: UserResponse){
    return auth.createCustomToken(user.id, {
        email: user.email
    });
  }
}