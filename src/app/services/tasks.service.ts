import { Injectable, effect, signal } from '@angular/core';
import { Task } from '@models/task.interface';
import { TASKS_KEY } from '../constants';

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	private _tasks = signal<Task[]>([]);

	constructor() {
		effect(() => {
			localStorage.setItem(TASKS_KEY, JSON.stringify(this._tasks()));
		});

		this._verifyTasksInStorage();
	}

	private _verifyTasksInStorage() {
		const tasks = localStorage.getItem(TASKS_KEY);
		tasks && this._tasks.set(JSON.parse(tasks));
	}

	addTask(title: string) {
		const newTask: Task = {
			id: crypto.randomUUID(),
			title,
			isDone: false
		};

		this._tasks.update((tasks) => [newTask, ...tasks]);
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
