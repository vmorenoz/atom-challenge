import {Request, Response} from 'express';
import {UserService} from '../services';
import {CreateUserRequest} from '../models';
import {BaseController} from './BaseController';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async findUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Email is required',
            code: 400
          }
        });
        return;
      }

      const user = await this.userService.findUserByEmail(email);
      
      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            message: 'User not found',
            code: 404
          }
        });
        return;
      }

      const token = await this.userService.createCustomToken(user);

      this.sendSuccess(res, {
        ...user,
        token
      }, 'User found successfully');
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserRequest: CreateUserRequest = {
        email: req.body.email
      };

      const user = await this.userService.createUser(createUserRequest);

      const token = await this.userService.createCustomToken(user);

      this.sendCreated(res, {
        ...user,
        token
      }, 'User created successfully');
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }
}