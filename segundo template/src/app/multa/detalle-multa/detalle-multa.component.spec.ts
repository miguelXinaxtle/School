import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMultaComponent } from './detalle-multa.component';

describe('DetalleMultaComponent', () => {
  let component: DetalleMultaComponent;
  let fixture: ComponentFixture<DetalleMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
