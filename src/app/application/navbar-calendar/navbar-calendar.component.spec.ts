import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCalendarComponent } from './navbar-calendar.component';

describe('NavbarCalendarComponent', () => {
  let component: NavbarCalendarComponent;
  let fixture: ComponentFixture<NavbarCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
