import { Task } from '../models';
import { COLLECTIONS } from '../config/firebase';
import { BaseRepository } from './BaseRepository';

export class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(COLLECTIONS.TASKS);
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async findByUserIdAndCompleted(userId: string, completed: boolean): Promise<Task[]> {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .where('completed', '==', completed)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }
}