import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '@services/tasks.service';
import { REGEX_TASK } from '../../../constants';

@Component({
	selector: 'app-task-input',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './task-input.component.html',
	styles: ``
})
export class TaskInputComponent {
	private _tasksService = inject(TasksService);
	taskControl = new FormControl('', Validators.pattern(REGEX_TASK));

	addTask() {
		const controlValue = this.taskControl.value?.trim();

		if (this.taskControl.invalid || !controlValue) return;

		this._tasksService.addTask(controlValue);
		this.taskControl.reset();
	}
}
