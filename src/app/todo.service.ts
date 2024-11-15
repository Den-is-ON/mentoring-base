import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "./todos-list/todos-list.component";



@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject$ = new BehaviorSubject<ITodo[]>([])
    todos$ = this.todosSubject$.asObservable()


    setTodos(todos: ITodo[]) {
        this.todosSubject$.next(todos)
    }

    editTodos(editedTodo: ITodo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => {
                    if (todo.id === editedTodo.id) {
                        return editedTodo
                    } else {
                        return todo
                    }
                }
            )
        )
    }

    createTodos(todo: ITodo) {
        const todoIsExisting = this.todosSubject$.value.find(
            (currentElement) => currentElement.title === todo.title
        )

        if (todoIsExisting !== undefined) {
            alert('Такая задача уже есть!!!')
        } else {
            this.todosSubject$.next([...this.todosSubject$.value, todo])
            alert('Задача успешно добавлена!!!')
        }

        
    }

    deleteTodos(id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                item => {
                    if (id === item.id) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        )
    }
}