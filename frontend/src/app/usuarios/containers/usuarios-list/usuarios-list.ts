import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { BehaviorSubject, catchError, EMPTY, Observable, Subject, switchMap } from 'rxjs';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.scss',
  standalone: false
})
export class UsuariosList {
  usuarios$ = new BehaviorSubject<Usuario[]>([]);

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.listUsuarios().subscribe(usuarios => {
      this.usuarios$.next(usuarios);
    });
  }

  onClickDeleteUsuario(usuarioId: number) {
    this.usuarioService.deleteUsuario(usuarioId).pipe(
      catchError((error) => {
        alert('Erro ao deletar usuário: ' + error.message);
        return EMPTY;
      }),
      switchMap(() => this.usuarioService.listUsuarios())
    ).subscribe(usuarios => {
      this.usuarios$.next(usuarios);
    });
  }
}
