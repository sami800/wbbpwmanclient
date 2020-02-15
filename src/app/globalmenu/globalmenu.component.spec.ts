import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalmenuComponent } from './globalmenu.component';

describe('GlobalmenuComponent', () => {
  let component: GlobalmenuComponent;
  let fixture: ComponentFixture<GlobalmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
