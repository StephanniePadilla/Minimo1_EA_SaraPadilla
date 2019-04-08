import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicisdeestacionComponent } from './bicisdeestacion.component';

describe('BicisdeestacionComponent', () => {
  let component: BicisdeestacionComponent;
  let fixture: ComponentFixture<BicisdeestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicisdeestacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicisdeestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
