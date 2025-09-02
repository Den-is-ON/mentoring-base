import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, mergeMap, of } from "rxjs";
import { LoadUsersActions } from "./user.actions";
import { UsersApiService } from "../../services/users-api.service";

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private userApiService: UsersApiService
    ) { }

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoadUsersActions.loadUsers),
            mergeMap(() =>
                this.userApiService.getUsers().pipe(
                    map(users => LoadUsersActions.loadUsersSuccess({ users })),
                    catchError(error => of(LoadUsersActions.loadUsersFailure({ error })))
                )
            )
        )
    })
}



