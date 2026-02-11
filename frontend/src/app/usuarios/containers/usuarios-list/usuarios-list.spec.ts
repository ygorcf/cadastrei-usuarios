import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosList } from './usuarios-list';
import { UsuariosModule } from '../../usuarios-module';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsuariosList', () => {
  let component: UsuariosList;
  let fixture: ComponentFixture<UsuariosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosModule, CommonModule],
      providers: [
        provideRouter([]),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
