import { Component, inject } from '@angular/core';
import { TaskInputComponent } from '@components/tasks/task-input/task-input.component';
import { TaskListComponent } from '@components/tasks/task-list/task-list.component';
import { TasksService } from '@services/tasks.service';

@Component({
	selector: 'app-tasks',
	standalone: true,
	imports: [TaskInputComponent, TaskListComponent],
	templateUrl: './tasks.component.html',
	styles: ``
})
export default class TasksComponent {
	private _tasksService = inject(TasksService);
	tasks = this._tasksService.tasks;
}
