import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalLicenciaComponent } from './principal-licencia.component';

describe('PrincipalLicenciaComponent', () => {
  let component: PrincipalLicenciaComponent;
  let fixture: ComponentFixture<PrincipalLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
