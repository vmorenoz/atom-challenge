import { Request, Response } from 'express';
import { TaskService } from '../services';
import { CreateTaskRequest, UpdateTaskRequest } from '../models';
import { BaseController } from './BaseController';

export class TaskController extends BaseController {
  private taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService();
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.uid;
      const tasks = await this.taskService.getAllTasksByUserId(userId);
      this.sendSuccess(res, tasks, `Found ${tasks.length} tasks`);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }

  async addTask(req: Request, res: Response): Promise<void> {

    const userId = (req as any).user?.uid;

    try {
      const createTaskRequest: CreateTaskRequest = {
        userId,
        title: req.body.title,
        description: req.body.description
      };

      const task = await this.taskService.createTask(createTaskRequest);
      this.sendCreated(res, task, 'Task created successfully');
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.query.taskId?.toString();

      if (!taskId) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Task ID is required in URL parameters',
            code: 400
          }
        });
        return;
      }

      const updateTaskRequest: UpdateTaskRequest = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      };

      const task = await this.taskService.updateTask(taskId, updateTaskRequest);
      this.sendSuccess(res, task, 'Task updated successfully');
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.query.taskId?.toString();

      if (!taskId) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Task ID is required in URL parameters',
            code: 400
          }
        });
        return;
      }

      await this.taskService.deleteTask(taskId);
      
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      this.handleError(res, error as Error);
    }
  }
}