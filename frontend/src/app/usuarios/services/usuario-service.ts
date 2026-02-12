import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintainUsuarioRequest, Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  public saveUsuario(usuarioData: MaintainUsuarioRequest, id?: number) {
    if (id) {
      return this.updateUsuario(id, usuarioData);
    } else {
      return this.createUsuario(usuarioData);
    }
  }

  public listUsuarios() {
    return this.http.get<Usuario[]>('/users');
  }

  public getUsuario(id: number) {
    return this.http.get<Usuario>(`/users/${id}`);
  }

  public createUsuario(usuarioData: MaintainUsuarioRequest) {
    return this.http.post<Usuario>('/users', usuarioData);
  }

  public updateUsuario(id: number, usuarioData: MaintainUsuarioRequest) {
    return this.http.put<Usuario>(`/users/${id}`, usuarioData);
  }

  public deleteUsuario(usuarioId: number) {
    return this.http.delete<number>(`/users/${usuarioId}`);
  }
}
