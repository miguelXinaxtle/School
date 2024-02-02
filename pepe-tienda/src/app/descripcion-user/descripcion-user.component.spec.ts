import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionUserComponent } from './descripcion-user.component';

describe('DescripcionUserComponent', () => {
  let component: DescripcionUserComponent;
  let fixture: ComponentFixture<DescripcionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescripcionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
