import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddportfolioComponent } from './addportfolio.component';

describe('AddportfolioComponent', () => {
  let component: AddportfolioComponent;
  let fixture: ComponentFixture<AddportfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddportfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
