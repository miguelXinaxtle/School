import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoDashboardComponent } from './documento-dashboard.component';

describe('DashboardDocumentosComponent', () => {
  let component: DocumentoDashboardComponent;
  let fixture: ComponentFixture<DocumentoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
