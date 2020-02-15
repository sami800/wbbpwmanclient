import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlistComponent } from './passwordlist.component';

describe('PasswordlistComponent', () => {
  let component: PasswordlistComponent;
  let fixture: ComponentFixture<PasswordlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
