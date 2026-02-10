import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './usuarios.routes';
import { UsuariosList } from './containers/usuarios-list/usuarios-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosMaintain } from './containers/usuarios-maintain/usuarios-maintain';

@NgModule({
  declarations: [UsuariosList, UsuariosMaintain],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
})
export class UsuariosModule { }
