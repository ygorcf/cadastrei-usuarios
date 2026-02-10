import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  public listUsuarios() {
    return this.http.get('/users');
  }

  public createUsuario(usuarioData: any) {
    return this.http.post('/users', usuarioData);
  }
}
