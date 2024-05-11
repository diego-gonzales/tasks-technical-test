import { Component, input } from '@angular/core';
import { Task } from '@models/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [TaskItemComponent],
	templateUrl: './task-list.component.html',
	styles: ``
})
export class TaskListComponent {
	tasks = input<Task[]>([]);
}
