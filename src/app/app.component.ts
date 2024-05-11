import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components/shared/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, NavbarComponent],
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent {
	title: string = 'tasks-app';
}
