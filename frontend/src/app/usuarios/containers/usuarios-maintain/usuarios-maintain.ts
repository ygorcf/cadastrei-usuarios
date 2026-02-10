import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-usuarios-maintain',
  templateUrl: './usuarios-maintain.html',
  styleUrl: './usuarios-maintain.scss',
  standalone: false
})
export class UsuariosMaintain {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const usuarioData = this.form.value;

    this.usuarioService.createUsuario(usuarioData).pipe(first()).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
