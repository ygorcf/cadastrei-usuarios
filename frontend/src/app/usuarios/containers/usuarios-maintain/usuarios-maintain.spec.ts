import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMaintain } from './usuarios-maintain';

describe('UsuariosMaintain', () => {
  let component: UsuariosMaintain;
  let fixture: ComponentFixture<UsuariosMaintain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosMaintain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosMaintain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
