import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, Observable } from 'rxjs';
import { LoadUsersActions } from './user.actions';
import { UsersApiService } from '../../services/users-api.service';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userApiService = inject(UsersApiService);

  loadUsers$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadUsersActions.loadUsers),
      mergeMap(() =>
        this.userApiService.getUsers().pipe(
          map((users: IUser[]) => LoadUsersActions.loadUsersSuccess({ users })),
          catchError((error: HttpErrorResponse) =>
            of(LoadUsersActions.loadUsersFailure({ error }))
          )
        )
      )
    );
  });
}
