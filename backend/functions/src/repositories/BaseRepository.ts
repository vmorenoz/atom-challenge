import {db} from '../config/firebase';
import {CollectionReference} from 'firebase-admin/firestore';

export abstract class BaseRepository<T> {
  protected collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async create(data: Omit<T, 'id'>): Promise<string> {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as T;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collection.doc(id).update({
      ...data,
      updatedAt: new Date()
    });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  protected async findBy(field: string, value: any): Promise<T[]> {
    const snapshot = await this.collection.where(field, '==', value).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }
}