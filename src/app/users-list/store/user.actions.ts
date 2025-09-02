import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IUser } from "../../interfaces/user.interface";

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'set': props<{ users: IUser[] }>(),
        'edit': props<{ user: IUser }>(),
        'create': props<{ user: IUser }>(),
        'delete': props<{ id: number }>(),
    }
})

export const LoadUsersActions = createActionGroup({
    source: 'User API',
    events: {
        'loadUsers': emptyProps(),
        'loadUsersSuccess': props<{ users: IUser[] }>(),
        'loadUsersFailure': props<{ error: any }>()
    }
})