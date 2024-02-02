import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDepartamentoComponent } from './producto-departamento.component';

describe('ProductoDepartamentoComponent', () => {
  let component: ProductoDepartamentoComponent;
  let fixture: ComponentFixture<ProductoDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
