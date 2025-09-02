import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITodo } from '../../interfaces/todo.interface';

export const TodoActions = createActionGroup({
  source: 'Todos',
  events: {
    set: props<{ todos: ITodo[] }>(),
    edit: props<{ todo: ITodo }>(),
    create: props<{ todo: ITodo }>(),
    delete: props<{ id: number }>(),
  },
});

export const LoadTodosActions = createActionGroup({
  source: 'Todo API',
  events: {
    loadTodos: emptyProps(),
    loadTodosSuccess: props<{ todos: ITodo[] }>(),
    loadTodosFailure: props<{ error: any }>(),
  },
});
