import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParcelComponent } from './edit-parcel.component';

describe('EditParcelComponent', () => {
  let component: EditParcelComponent;
  let fixture: ComponentFixture<EditParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
