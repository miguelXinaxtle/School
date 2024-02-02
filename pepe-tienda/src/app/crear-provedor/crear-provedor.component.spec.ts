import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProvedorComponent } from './crear-provedor.component';

describe('CrearProvedorComponent', () => {
  let component: CrearProvedorComponent;
  let fixture: ComponentFixture<CrearProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProvedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
