import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.scss',
  standalone: false
})
export class UsuariosList {
  usuarios$: Observable<any>;

  constructor(private usuarioService: UsuarioService) {
    this.usuarios$ = this.usuarioService.listUsuarios();
  }

}
