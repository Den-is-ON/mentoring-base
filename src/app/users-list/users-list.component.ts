import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../services/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../services/user.service";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { UserCreateButtonComponent } from "../create-user-form/create-user-dialog/user-create-button.component";
import { CardShadowDirective } from "../directives/card-shadow.directive";
import { Store } from "@ngrx/store";
import { UserActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";
import { UsersEffects } from "./store/users.effects";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, UserCreateButtonComponent, CardShadowDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UsersEffects
    ]
})

export class UsersListComponent {
    readonly usersApiServise = inject(UsersApiService)
    readonly usersService = inject(UsersService)
    private readonly store = inject(Store)
    public readonly users$ = this.store.select(selectUsers)

    constructor() {
        this.usersApiServise.getUsers().subscribe(
            (response: IUser[]) => {
                this.store.dispatch(UserActions.set({ users: response }))
            },
            (error: any) => {
                console.error('Ошибка при получении пользователей:', error);
            }
        )

        this.usersService.users$.subscribe(
            users => console.log(users)
        )
    }

    public deleteUser(id: number) {
        this.store.dispatch(UserActions.delete({ id }))
    }

    public editUser(user: IUser) {
        this.store.dispatch(UserActions.edit({ user }))
    }

    public createUser(formData: ICreateUser) {
        this.store.dispatch(
            UserActions.create({
                user: {
                    id: new Date().getTime(),
                    name: formData.name,
                    email: formData.email,
                    website: formData.website,
                    company: {
                        name: formData.company.name,
                    },
                    phone: formData.phone
                }
            })
        )
    }
}

