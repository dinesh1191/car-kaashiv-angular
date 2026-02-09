import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpManageComponent } from './emp-manage.component';

describe('EmpManageComponent', () => {
  let component: EmpManageComponent;
  let fixture: ComponentFixture<EmpManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
