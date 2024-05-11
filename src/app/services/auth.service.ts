import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from '@models/login-credentials.interface';
import { USER_KEY, VALID_USER } from '../constants';
import { StoreService } from './store.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _router = inject(Router);
	private _storeService = inject(StoreService);

	login(credentials: LoginCredentials) {
		const { username, password } = credentials;

		if (username === VALID_USER.username && password === VALID_USER.password) {
			this._storeService.setLoggedInUser(credentials);
			this._router.navigateByUrl('/tasks');
			return true;
		}

		return false;
	}

	logout() {
		localStorage.removeItem(USER_KEY);
		this._storeService.setLoggedInUser(null);
		this._router.navigateByUrl('/login');
	}
}
