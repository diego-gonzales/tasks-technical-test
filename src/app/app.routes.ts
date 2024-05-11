import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('@pages/login/login.component'),
		title: 'Login'
	},
	{
		path: 'tasks',
		loadComponent: () => import('@pages/tasks/tasks.component'),
		title: 'Tasks'
	},
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'tasks'
	}
];
