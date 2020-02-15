import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusfooterComponent } from './statusfooter.component';

describe('StatusfooterComponent', () => {
  let component: StatusfooterComponent;
  let fixture: ComponentFixture<StatusfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
