import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./usuarios/usuarios-module').then(m => m.UsuariosModule)
    }
];
