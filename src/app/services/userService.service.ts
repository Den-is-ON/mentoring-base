import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

export interface IUser {
    name: string,
    email: string,
    isAdmin: boolean | null;
}

@Injectable({ providedIn: 'root' })

export class UserService {
    // private currentUser: { isAdmin: boolean } | null = null;
    private readonly userSubject$ = new BehaviorSubject<IUser | null>(null)
    public readonly user$ = this.userSubject$.asObservable()


    private user: IUser = {
        name: 'Ильнур',
        email: 'Ряжапов',
        isAdmin: null,
    }

    loginAsAdmin() {
        console.log('Вошли как админ')
        this.userSubject$.next({ ...this.user, isAdmin: true })
    }

    loginAsUser() {
        console.log('Вошли как пользователь')
        this.userSubject$.next({ ...this.user, isAdmin: false })
    }

    get isAdmin() {
        return this.userSubject$.value?.isAdmin
    }

    logout() {
        this.userSubject$.next(null)
        console.log(this.userSubject$)
    }

    
}