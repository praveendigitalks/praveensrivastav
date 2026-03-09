import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticreportComponent } from './analyticreport.component';

describe('AnalyticreportComponent', () => {
  let component: AnalyticreportComponent;
  let fixture: ComponentFixture<AnalyticreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
