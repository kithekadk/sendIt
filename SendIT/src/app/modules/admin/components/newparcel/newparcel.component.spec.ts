import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewparcelComponent } from './newparcel.component';

describe('NewparcelComponent', () => {
  let component: NewparcelComponent;
  let fixture: ComponentFixture<NewparcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewparcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewparcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
