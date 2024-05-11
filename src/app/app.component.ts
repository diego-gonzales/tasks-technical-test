import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterLink,
	RouterOutlet
} from '@angular/router';
import { NavbarComponent } from '@components/shared/navbar/navbar.component';
import { StoreService } from '@services/store.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, NavbarComponent],
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit, OnDestroy {
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _storeService = inject(StoreService);

	destroy$ = new Subject<boolean>();

	ngOnInit(): void {
		this.getRouteTitle();
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	getRouteTitle() {
		this._router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				while (this._activatedRoute.firstChild) {
					this._activatedRoute = this._activatedRoute.firstChild;
				}

				this._storeService.setHeaderTitle(
					this._activatedRoute.routeConfig?.title?.toString() || 'Tasks App'
				);
			});
	}
}
