import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitconfirmComponent } from './exitconfirm.component';

describe('ExitconfirmComponent', () => {
  let component: ExitconfirmComponent;
  let fixture: ComponentFixture<ExitconfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitconfirmComponent]
    });
    fixture = TestBed.createComponent(ExitconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
