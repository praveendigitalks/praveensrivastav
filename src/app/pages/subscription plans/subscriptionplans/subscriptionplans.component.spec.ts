import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionplansComponent } from './subscriptionplans.component';

describe('SubscriptionplansComponent', () => {
  let component: SubscriptionplansComponent;
  let fixture: ComponentFixture<SubscriptionplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionplansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
