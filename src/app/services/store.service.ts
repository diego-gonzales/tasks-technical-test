import { Injectable, effect, signal } from '@angular/core';
import { LoginCredentials } from '@models/login-credentials.interface';
import { USER_KEY } from '../constants';

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private _loggedInUser = signal<LoginCredentials | null>(null);
	private _headerTitle = signal<string>('');

	constructor() {
		effect(() => {
			localStorage.setItem(USER_KEY, JSON.stringify(this._loggedInUser()));
		});

		this._verifyUserInStorage();
	}

	private _verifyUserInStorage() {
		const user = localStorage.getItem(USER_KEY);
		user && this._loggedInUser.set(JSON.parse(user));
	}

	get loggedInUser() {
		return this._loggedInUser.asReadonly();
	}

	get headerTitle() {
		return this._headerTitle.asReadonly();
	}

	setLoggedInUser(user: LoginCredentials | null) {
		this._loggedInUser.set(user);
	}

	setHeaderTitle(title: string) {
		this._headerTitle.set(title);
	}
}
