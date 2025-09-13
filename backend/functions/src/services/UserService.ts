import {CreateUserRequest, User, UserResponse} from '../models';
import {UserRepository} from '../repositories';
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserByEmail(email: string): Promise<UserResponse | null> {
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Invalid email provided');
    }

    const user = await this.userRepository.findByEmail(email);
    return user ? this.mapToUserResponse(user) : null;
  }

  async createCustomToken(user: UserResponse){
    return this.userRepository.createCustomToken(user);
  }

  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    if (!request.email || !this.isValidEmail(request.email)) {
      throw new Error('Invalid email provided');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const userData: Omit<User, 'id'> = {
      email: request.email.toLowerCase().trim(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const userId = await this.userRepository.create(userData);
    const createdUser = await this.userRepository.findById(userId);

    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    return this.mapToUserResponse(createdUser);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private mapToUserResponse(user: User): UserResponse {
    return {
      id: user.id!,
      email: user.email,
      createdAt: user.createdAt?.toDate(),
      updatedAt: user.updatedAt?.toDate(),
    };
  }
}