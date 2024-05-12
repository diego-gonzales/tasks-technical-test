import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { publicGuard } from '@guards/public.guard';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('@pages/login/login.component'),
		title: 'Login',
		canActivate: [publicGuard]
	},
	{
		path: 'tasks',
		loadComponent: () => import('@pages/tasks/tasks.component'),
		title: 'Tasks',
		canActivate: [authGuard]
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
