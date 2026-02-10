import { Routes } from '@angular/router';
import { UsuariosList } from './containers/usuarios-list/usuarios-list';
import { UsuariosMaintain } from './containers/usuarios-maintain/usuarios-maintain';

export const routes: Routes = [
    {
        path: '',
        component: UsuariosList
    },
    {
        path: 'novo',
        component: UsuariosMaintain
    },
];
