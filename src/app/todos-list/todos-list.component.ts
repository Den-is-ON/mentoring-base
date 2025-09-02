import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../services/todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../services/todo.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";

import { TodoActions } from "./store/todo.actions";
import { selectTodos } from "./store/todos.selectors";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [TodoCardComponent, NgFor, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent {
    readonly todosApiService = inject(TodosApiService)
    readonly todosService = inject(TodosService)
    private readonly store = inject(Store)
    public readonly todos$ = this.store.select(selectTodos)

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                // this.todosService.setTodos(response)
                this.store.dispatch(TodoActions.set({ todos: response }))
            }
        )

        this.todosService.todos$.subscribe(
            todos => console.log(todos)
        )
    }

    public deleteTodo(id: number) {
        // this.todosService.deleteTodos(id)
        this.store.dispatch(TodoActions.delete({ id }))
    }

    public createTodo(formData: any) {
        this.store.dispatch(
            TodoActions.create({
                todo: {
                    id: new Date().getTime(),
                    title: formData.title,
                    userId: formData.userId,
                    completed: formData.completed
                }
            })
        )
    }
}

