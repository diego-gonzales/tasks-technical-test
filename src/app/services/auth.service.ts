import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from '@models/login-credentials.interface';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _router = inject(Router);
	private _validUser = signal<LoginCredentials>({
		username: 'test01',
		password: 'test01'
	});

	login(credentials: LoginCredentials) {
		const { username, password } = credentials;

		if (username === this._validUser().username && password === this._validUser().password) {
			this._redirectToTasksPage();
			return of(true);
		}

		return of(false);
	}

	private _redirectToTasksPage(): void {
		this._router.navigateByUrl('/tasks');
	}
}
