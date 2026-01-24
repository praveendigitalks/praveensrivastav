import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggeddevicesComponent } from './loggeddevices.component';

describe('LoggeddevicesComponent', () => {
  let component: LoggeddevicesComponent;
  let fixture: ComponentFixture<LoggeddevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggeddevicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggeddevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
