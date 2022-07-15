import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenConsultaComponent } from './orden-consulta.component';

describe('OrdenConsultaComponent', () => {
  let component: OrdenConsultaComponent;
  let fixture: ComponentFixture<OrdenConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
