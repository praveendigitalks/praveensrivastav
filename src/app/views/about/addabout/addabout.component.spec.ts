import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaboutComponent } from './addabout.component';

describe('AddaboutComponent', () => {
  let component: AddaboutComponent;
  let fixture: ComponentFixture<AddaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddaboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
