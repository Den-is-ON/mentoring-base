import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IUser } from '../../interfaces/user.interface';

interface UserState {
    users: IUser[];
}

const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UserActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user: IUser) =>
      user.id === payload.user.id ? payload.user : user
    ),
  })),
  on(UserActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UserActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user: IUser) => user.id !== payload.id),
  }))
);
