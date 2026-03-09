import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagemonitoringComponent } from './usagemonitoring.component';

describe('UsagemonitoringComponent', () => {
  let component: UsagemonitoringComponent;
  let fixture: ComponentFixture<UsagemonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsagemonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsagemonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
