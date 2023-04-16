import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrFieldComponent } from './err-field.component';

describe('ErrFieldComponent', () => {
  let component: ErrFieldComponent;
  let fixture: ComponentFixture<ErrFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
