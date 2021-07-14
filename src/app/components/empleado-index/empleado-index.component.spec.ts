import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoIndexComponent } from './empleado-index.component';

describe('EmpleadoIndexComponent', () => {
  let component: EmpleadoIndexComponent;
  let fixture: ComponentFixture<EmpleadoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
