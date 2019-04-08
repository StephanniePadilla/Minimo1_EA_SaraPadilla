import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturadetalleComponent } from './asignaturadetalle.component';

describe('AsignaturadetalleComponent', () => {
  let component: AsignaturadetalleComponent;
  let fixture: ComponentFixture<AsignaturadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaturadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
