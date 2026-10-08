import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { form } from '@angular/forms/signals';
import { Form } from './pages/form/form';
import { Books } from './pages/books/books';
import { Details } from './pages/details/details';


export const routes: Routes = [
    {path:'', component: Home},
    {path:'add', component: Form},
    {path:'edit/:id', component: Form},
    {path:'books', component: Books},
    {path:'books/:id', component: Details}
];
