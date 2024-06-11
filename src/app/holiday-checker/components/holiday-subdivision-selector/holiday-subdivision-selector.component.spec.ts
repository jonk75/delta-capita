import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaySubdivisionSelectorComponent } from './holiday-subdivision-selector.component';

describe('HolidaySubdivisionSelectorComponent', () => {
  let component: HolidaySubdivisionSelectorComponent;
  let fixture: ComponentFixture<HolidaySubdivisionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaySubdivisionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaySubdivisionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
