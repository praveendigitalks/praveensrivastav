import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubscriptionmanagementComponent } from './addsubscriptionmanagement.component';

describe('AddsubscriptionmanagementComponent', () => {
  let component: AddsubscriptionmanagementComponent;
  let fixture: ComponentFixture<AddsubscriptionmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsubscriptionmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubscriptionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
