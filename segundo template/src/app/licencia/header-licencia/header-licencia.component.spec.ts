import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLicenciaComponent } from './header-licencia.component';

describe('HeaderLicenciaComponent', () => {
  let component: HeaderLicenciaComponent;
  let fixture: ComponentFixture<HeaderLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
