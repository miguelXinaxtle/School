import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTenenciaComponent } from './detalle-tenencia.component';

describe('DetalleTenenciaComponent', () => {
  let component: DetalleTenenciaComponent;
  let fixture: ComponentFixture<DetalleTenenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTenenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTenenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
