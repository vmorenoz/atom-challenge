import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TaskService} from '@data/services/task.service';
import {Task} from '@data/models/task.model';
import {Dialog} from '@angular/cdk/dialog';
import {TaskFormModal} from '@presentation/organisms/task-form-modal/task-form-modal';
import {NgClass} from '@angular/common';
import {Navbar} from '@presentation/molecules/navbar/navbar';

@Component({
  selector: 'app-tasks',
  imports: [
    ReactiveFormsModule,
    NgClass,
    Navbar
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss'
})
export class TasksPage implements OnInit {

  readonly taskServices = inject(TaskService);
  readonly dialog = inject(Dialog);

  statusActive = new FormControl(false);
  taskList = signal<Task[]>([]);
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  completedTasks = computed(() => this.taskList().filter(task => task.completed));
  pendingTasks = computed(() => this.taskList().filter(task => !task.completed));

  ngOnInit() {
    this.getTasks();
  }

  handleCreateTask() {
    const dialog = this.dialog.open(TaskFormModal, {
      width: '50vw',
    });

    dialog.closed.subscribe((result) => {
      if (result) {
        this.taskServices.addTask(result)
          .subscribe({
            next: (task) => {
              this.taskList.update((tasks) => [task, ...tasks]);
              this.fireToast('Tarea creada con exito');
            },
            error: (error) => {
              this.fireToast(error.message, 'error');
            }
          })
      }
    });
  }

  handleEditTask(task: Task) {
    const dialog = this.dialog.open(TaskFormModal, {
      width: '50vw',
      data: {
        isEdition: true,
        task
      }
    });

    dialog.closed.subscribe((result) => {
      if (result) {
        const updatedTask = { ...task, ...result };
        this.taskServices.updateTask(task.id, updatedTask)
          .subscribe({
            next: (task) => {
              this.taskList.update((tasks) => tasks.map(t => t.id === task.id ? task : t));
              this.fireToast('Tarea actualizada con exito');
            },
            error: (error) => {
              this.fireToast(error.message, 'error');
            }
          })
      }
    });
  }

  handleDeleteTask(taskId: string) {
    this.taskServices.deleteTask(taskId)
      .subscribe({
        next: () => {
          this.taskList.update((tasks) => tasks.filter(t => t.id !== taskId));
          this.fireToast('Tarea eliminada con exito');
        },
        error: (error) => {
          this.fireToast(error.message, 'error');
        }
      })
  }

  handleMarkComplete(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskServices.updateTask(task.id, updatedTask)
      .subscribe({
        next: (task) => {
          this.taskList.update((tasks) => tasks.map(t => t.id === task.id ? task : t));
          this.fireToast('Tarea actualizada con exito');
        },
        error: (error) => {
          this.fireToast(error.message, 'error');
        }
      })
  }

  private fireToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }

  private getTasks() {
    this.taskServices
      .getTasks()
      .subscribe({
        next: (tasks) => {
          this.taskList.set(tasks);
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}
