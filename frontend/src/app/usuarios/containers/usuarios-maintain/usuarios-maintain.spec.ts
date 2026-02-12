import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMaintain } from './usuarios-maintain';
import { UsuariosModule } from '../../usuarios-module';
import { provideRouter } from '@angular/router';

describe('UsuariosMaintain', () => {
  let component: UsuariosMaintain;
  let fixture: ComponentFixture<UsuariosMaintain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosModule],
      providers: [
        provideRouter([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosMaintain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be invalid when empty', () => {
      expect(component.form.valid).toBeFalsy();
    });

    it('should email field be invalid if value is not a valid email', () => {
      // arrange
      const emailControl = component.form.controls['email'];

      // act
      emailControl.setValue('invalid-email');

      // assert
      expect(emailControl.valid).toBeFalsy();
    });

    it('should email field be valid if value is a valid email', () => {
      // arrange
      const emailControl = component.form.controls['email'];

      // act
      emailControl.setValue('valid-email@example.com');

      // assert
      expect(emailControl.valid).toBeTruthy();
    });

    it('should form be valid if all fields are valid', () => {
      // arrange
      const nameControl = component.form.controls['name'];
      const emailControl = component.form.controls['email'];
      const passwordControl = component.form.controls['password'];
      const confirmPasswordControl = component.form.controls['confirmPassword'];

      // act
      nameControl.setValue('Valid Name');
      emailControl.setValue('valid-email@example.com');
      passwordControl.setValue('ValidPassword123');
      confirmPasswordControl.setValue('ValidPassword123');

      // assert
      expect(component.form.valid).toBeTruthy();
    });

    it('should submit button be enabled if form is valid', () => {
      // arrange
      const nameControl = component.form.controls['name'];
      const emailControl = component.form.controls['email'];
      const passwordControl = component.form.controls['password'];
      const confirmPasswordControl = component.form.controls['confirmPassword'];
      const compiled = fixture.nativeElement as HTMLElement;

      // act
      nameControl.setValue('Valid Name');
      emailControl.setValue('valid-email@example.com');
      passwordControl.setValue('ValidPassword123');
      confirmPasswordControl.setValue('ValidPassword123');
      fixture.detectChanges();

      // assert
      expect(compiled.querySelector('button')?.disabled).toBeFalsy();
    });
  });
});
