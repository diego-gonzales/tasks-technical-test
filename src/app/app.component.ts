import { Component, OnInit, inject } from '@angular/core';
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterLink,
	RouterOutlet,
	TitleStrategy
} from '@angular/router';
import { NavbarComponent } from '@components/shared/navbar/navbar.component';
import { StoreService } from '@services/store.service';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, NavbarComponent],
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _titleStrategy = inject(TitleStrategy);
	private _storeService = inject(StoreService);

	destroy$ = new Subject<boolean>();

	ngOnInit(): void {
		this.getRouteTitle();
	}

	getRouteTitle() {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const activatedRoute = this._getChild(this._activatedRoute);

				const currentTitle = this._titleStrategy.getResolvedTitleForRoute(
					activatedRoute.snapshot
				);

				this._storeService.setHeaderTitle(currentTitle);
			});
	}

	private _getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
		if (activatedRoute.firstChild) {
			return this._getChild(activatedRoute.firstChild);
		}

		return activatedRoute;
	}
}
