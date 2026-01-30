import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresumeComponent } from './addresume.component';

describe('AddresumeComponent', () => {
  let component: AddresumeComponent;
  let fixture: ComponentFixture<AddresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
