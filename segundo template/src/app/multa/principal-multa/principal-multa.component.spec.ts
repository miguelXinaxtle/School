import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalMultaComponent } from './principal-multa.component';

describe('PrincipalMultaComponent', () => {
  let component: PrincipalMultaComponent;
  let fixture: ComponentFixture<PrincipalMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalMultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
