import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtenantsComponent } from './addtenants.component';

describe('AddtenantsComponent', () => {
  let component: AddtenantsComponent;
  let fixture: ComponentFixture<AddtenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtenantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
