import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../../interfaces/todo.interface';
import { TodoActions } from './todo.actions';

interface TodoState {
  todos: ITodo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),
  on(TodoActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo:ITodo) =>
      todo.id === payload.todo.id ? payload.todo : todo
    ),
  })),
  on(TodoActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodoActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter((todo: ITodo) => todo.id !== payload.id),
  }))
);
