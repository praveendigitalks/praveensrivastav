import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminSidebarComponent } from './superadmin-sidebar.component';

describe('SuperadminSidebarComponent', () => {
  let component: SuperadminSidebarComponent;
  let fixture: ComponentFixture<SuperadminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperadminSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
