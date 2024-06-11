import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaySelectorsComponent } from './holiday-selectors.component';

describe('HolidaySelectorsComponent', () => {
  let component: HolidaySelectorsComponent;
  let fixture: ComponentFixture<HolidaySelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaySelectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaySelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
