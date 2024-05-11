import { Injectable, signal } from '@angular/core';
import { Task } from '@models/task.interface';

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	private _tasks = signal<Task[]>([]);

	addTask(title: string) {
		const newTask: Task = {
			id: crypto.randomUUID(),
			title,
			isDone: false
		};

		this._tasks.update((tasks) => [...tasks, newTask]);
	}

	updateTaskStatus(taskId: string, isDone: boolean) {
		this._tasks.update((tasks) => {
			return tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, isDone };
				}

				return task;
			});
		});
	}

	removeTask(taskId: string) {
		this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
	}

	get tasks() {
		return this._tasks.asReadonly();
	}
}
