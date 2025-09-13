import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {catchError, map} from 'rxjs';
import {Task} from '@data/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private  readonly httpClient = inject(HttpClient);

  getTasks() {
    const url = `${environment.apiUrl}/getTasks`;
    return this.httpClient.get(url)
      .pipe(map((res: any) => {
        return res.data as Task[]
      }), catchError(err => {
        throw new Error('Ocurrio un error, intentalo nuevamente');
      }));
  }

  addTask(task: Partial<Task>) {
    const url = `${environment.apiUrl}/addTask`;
    return this.httpClient.post(url, task)
      .pipe(map((res: any) => {
        return res.data as Task
      }), catchError(err => {
        throw new Error('Ocurrio un error, intentalo nuevamente');
      }));
  }

  updateTask(taskId: string, task: Partial<Task>) {
    const url = `${environment.apiUrl}/updateTask`;
    return this.httpClient.put(url, task, {params: {taskId}})
      .pipe(map((res: any) => {
        return res.data as Task
      }), catchError(err => {
        throw new Error('Ocurrio un error, intentalo nuevamente');
      }));
  }

  deleteTask(taskId: string) {
    const url = `${environment.apiUrl}/deleteTask`;
    return this.httpClient.delete(url, {params: {taskId}})
      .pipe(map((res: any) => {
        return res.data as Task
      }), catchError(err => {
        throw new Error('Ocurrio un error, intentalo nuevamente');
      }));
  }

}
