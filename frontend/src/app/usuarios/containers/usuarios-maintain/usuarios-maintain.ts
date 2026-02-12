import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { first } from 'rxjs/internal/operators/first';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-usuarios-maintain',
  templateUrl: './usuarios-maintain.html',
  styleUrl: './usuarios-maintain.scss',
  standalone: false
})
export class UsuariosMaintain implements OnInit {

  form: FormGroup;
  formConfig = [
    { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Email', controlName: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', controlName: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', controlName: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.getUsuario(+id).subscribe(usuario => {
        this.form.patchValue(usuario);
      });
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const usuarioData = this.form.value;

    this.usuarioService.saveUsuario(usuarioData, id ? +id : undefined).pipe(first(), catchError(e => {
      if (e.error && e.error.message) {
        alert(`Error: ${e.error.message}`);
      } else {
        alert('Ocorreu um erro inesperado ao salvar o usuario.');
      }

      return [];
    })).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  parseError(error: any): string | null {
    if ('required' in error && error.required) {
      return "Campo obrigatório";
    }

    if ('email' in error && error.email) {
      return "Email inválido";
    }

    if ('minlength' in error && error.minlength) {
      return `O campo deve ter no mínimo ${error.minlength.requiredLength} caracteres`;
    }

    if ('maxlength' in error && error.maxlength) {
      return `O campo deve ter no máximo ${error.maxlength.requiredLength} caracteres`;
    }

    if ('passwordMismatch' in error && error.passwordMismatch) {
      return `As senhas não são iguais`;
    }

    console.log('Unknown error:', error);

    return null;
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
}
