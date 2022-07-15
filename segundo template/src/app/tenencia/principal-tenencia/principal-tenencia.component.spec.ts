import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTenenciaComponent } from './principal-tenencia.component';

describe('PrincipalTenenciaComponent', () => {
  let component: PrincipalTenenciaComponent;
  let fixture: ComponentFixture<PrincipalTenenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalTenenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalTenenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
