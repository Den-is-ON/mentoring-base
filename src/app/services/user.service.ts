import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })
export class UsersService {
    private usersSubject$ = new BehaviorSubject<IUser[]>([])
    public readonly users$ = this.usersSubject$.asObservable()
}