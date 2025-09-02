import { Injectable } from "@angular/core"
import { TodosApiService } from "../../services/todos-api.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { mergeMap, map, catchError, of } from "rxjs"
import { LoadTodosActions } from "./todo.actions"
import { ITodo } from "../../interfaces/todo.interface"

@Injectable()
export class TodosEffects {
    constructor(
        private actions$: Actions,
        private todoApiService: TodosApiService
    ) { }

    loadTodos$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(LoadTodosActions.loadTodos),
                mergeMap(() =>
                    this.todoApiService.getTodos().pipe(
                        map(todos => LoadTodosActions.loadTodosSuccess({ todos })),
                        catchError(error => of(LoadTodosActions.loadTodosFailure({ error })))
                    )
                )
            )
        })
}