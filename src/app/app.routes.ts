import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomePageCompoment } from './homePage/home-page.cpmponent';
import { TodoListComponent } from './todos-list/todos-list.component';
import { AdminComponent } from './admin/admin.component';
// import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageCompoment,
    },

    {
        path: 'users',
        component: UsersListComponent,
        pathMatch: 'full'
    },

    {
        path: 'todos',
        component: TodoListComponent,
        pathMatch: 'full'
    },

    {
        path: 'admin',
        component: AdminComponent,
        // canActivate: [authGuard]
    }
];
