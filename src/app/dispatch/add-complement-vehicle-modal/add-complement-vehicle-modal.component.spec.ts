import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplementVehicleModalComponent } from './add-complement-vehicle-modal.component';

describe('AddComplementVehicleModalComponent', () => {
  let component: AddComplementVehicleModalComponent;
  let fixture: ComponentFixture<AddComplementVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplementVehicleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplementVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
