import { inject, Injectable } from '@angular/core';
import { TodosApiService } from '../../services/todos-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, Observable } from 'rxjs';
import { LoadTodosActions } from './todo.actions';
import { ITodo } from '../../interfaces/todo.interface';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private todoApiService = inject(TodosApiService);

  loadTodos$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadTodosActions.loadTodos),
      mergeMap(() =>
        this.todoApiService.getTodos().pipe(
          map((todos: ITodo[]) => LoadTodosActions.loadTodosSuccess({ todos })),
          catchError((error: HttpErrorResponse) =>
            of(LoadTodosActions.loadTodosFailure({ error }))
          )
        )
      )
    );
  });
}
