import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationdialogComponent } from './registrationdialog.component';

describe('RegistrationdialogComponent', () => {
  let component: RegistrationdialogComponent;
  let fixture: ComponentFixture<RegistrationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
