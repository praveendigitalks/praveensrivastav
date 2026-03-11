import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionmanagementComponent } from './subscriptionmanagement.component';

describe('SubscriptionmanagementComponent', () => {
  let component: SubscriptionmanagementComponent;
  let fixture: ComponentFixture<SubscriptionmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
