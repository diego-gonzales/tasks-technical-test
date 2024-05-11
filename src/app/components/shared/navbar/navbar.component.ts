import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { StoreService } from '@services/store.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './navbar.component.html',
	styles: ``
})
export class NavbarComponent {
	private _storeService = inject(StoreService);
	private _authService = inject(AuthService);
	loggedInUser = this._storeService.loggedInUser;
	headerTitle = this._storeService.headerTitle;

	logout() {
		this._authService.logout();
	}
}
