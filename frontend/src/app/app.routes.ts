import {Routes} from '@angular/router';
import {publicGuard} from './core/guards/public-guard';
import {privateGuard} from './core/guards/private-guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./presentation/pages/sign-in/sign-in.page').then((m) => m.SignInPage),
    canActivate: [publicGuard]
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./presentation/pages/tasks/tasks.page').then((m) => m.TasksPage),
    canActivate: [privateGuard]
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];
