import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCountrySelectorComponent } from './holiday-country-selector.component';

describe('HolidayCountrySelectorComponent', () => {
  let component: HolidayCountrySelectorComponent;
  let fixture: ComponentFixture<HolidayCountrySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayCountrySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayCountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
