import {CreateTaskRequest, Task, TaskResponse, UpdateTaskRequest} from '../models';
import {TaskRepository, UserRepository} from '../repositories';
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

export class TaskService {
  private taskRepository: TaskRepository;
  private userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  async getAllTasksByUserId(userId: string): Promise<TaskResponse[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const tasks = await this.taskRepository.findByUserId(userId);
    return tasks.map(task => this.mapToTaskResponse(task));
  }

  async createTask(request: CreateTaskRequest): Promise<TaskResponse> {
    if (!request.userId) {
      throw new Error('User ID is required');
    }

    if (!request.title || request.title.trim().length === 0) {
      throw new Error('Task title is required');
    }

    if (!request.description || request.description.trim().length === 0) {
      throw new Error('Task description is required');
    }

    // Verify user exists
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const taskData: Omit<Task, 'id'> = {
      userId: request.userId,
      title: request.title.trim(),
      description: request.description.trim(),
      completed: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const taskId = await this.taskRepository.create(taskData);
    const createdTask = await this.taskRepository.findById(taskId);

    if (!createdTask) {
      throw new Error('Failed to create task');
    }

    return this.mapToTaskResponse(createdTask);
  }

  async updateTask(taskId: string, request: UpdateTaskRequest): Promise<TaskResponse> {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    // Verify task exists
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Validate update data
    const updateData: Partial<Task> = {};

    if (request.title !== undefined) {
      if (request.title.trim().length === 0) {
        throw new Error('Task title cannot be empty');
      }
      updateData.title = request.title.trim();
    }

    if (request.description !== undefined) {
      if (request.description.trim().length === 0) {
        throw new Error('Task description cannot be empty');
      }
      updateData.description = request.description.trim();
    }

    if (request.completed !== undefined) {
      updateData.completed = request.completed;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    await this.taskRepository.update(taskId, updateData);
    const updatedTask = await this.taskRepository.findById(taskId);

    if (!updatedTask) {
      throw new Error('Failed to update task');
    }

    return this.mapToTaskResponse(updatedTask);
  }

  async deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    // Verify task exists
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(taskId);
  }

  private mapToTaskResponse(task: Task): TaskResponse {
    return {
      id: task.id!,
      userId: task.userId,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt.toDate(),
      updatedAt: task.updatedAt.toDate()
    };
  }
}