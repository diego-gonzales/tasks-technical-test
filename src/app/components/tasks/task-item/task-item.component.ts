import { Component, computed, inject, input } from '@angular/core';
import { Task } from '@models/task.interface';
import { TasksService } from '@services/tasks.service';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [],
	templateUrl: './task-item.component.html',
	styles: ``
})
export class TaskItemComponent {
	private _tasksService = inject(TasksService);
	task = input.required<Task>();
	taskIsDone = computed(() => this.task().isDone);

	onInputChange(event: Event) {
		const checkValue = (event.target as HTMLInputElement).checked;
		this._tasksService.updateTaskStatus(this.task().id, checkValue);
	}

	removeTask() {
		this._tasksService.removeTask(this.task().id);
	}
}
