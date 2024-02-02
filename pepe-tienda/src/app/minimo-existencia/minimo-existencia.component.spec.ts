import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimoExistenciaComponent } from './minimo-existencia.component';

describe('MinimoExistenciaComponent', () => {
  let component: MinimoExistenciaComponent;
  let fixture: ComponentFixture<MinimoExistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimoExistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimoExistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
