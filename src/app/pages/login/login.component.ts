import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
	styles: `
		.form-height {
			min-height: calc(100vh - 120px);
		}
	`
})
export default class LoginComponent {
	private _authService = inject(AuthService);
	private _formBuilder = inject(NonNullableFormBuilder);

	loginForm = this._formBuilder.group({
		username: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	onSubmit(): void {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const credentials = {
			username: this._getFormControl.username.value,
			password: this._getFormControl.password.value
		};

		const response = this._authService.login(credentials);

		if (!response) {
			alert('Invalid credentials');
		}
	}

	formControlIsInvalid(controlName: string) {
		const control = this.loginForm.get(controlName);
		return control?.invalid && control?.touched;
	}

	getPasswordControlErrorMessage() {
		const errors = this._getFormControl.password.errors;

		if (errors?.['minlength']) return 'Password must be at least 6 characters';
		return 'Password is required';
	}

	private get _getFormControl() {
		return this.loginForm.controls;
	}
}
