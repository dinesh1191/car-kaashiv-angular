import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRegisterFormComponent } from './emp-register-form.component';

describe('EmpRegisterFormComponent', () => {
  let component: EmpRegisterFormComponent;
  let fixture: ComponentFixture<EmpRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpRegisterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
