import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StoreService } from '@services/store.service';

export const publicGuard: CanActivateFn = (route, state) => {
	const _storeService = inject(StoreService);
	const _router = inject(Router);

	const isLoggedIn = _storeService.loggedInUser();

	if (isLoggedIn) {
		_router.navigateByUrl('/tasks');
		return false;
	}

	return true;
};
