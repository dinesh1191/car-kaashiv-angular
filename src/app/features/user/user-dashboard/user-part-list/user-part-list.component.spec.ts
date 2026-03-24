import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPartListComponent } from './user-part-list.component';

describe('UserPartListComponent', () => {
  let component: UserPartListComponent;
  let fixture: ComponentFixture<UserPartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPartListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
