import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListViewComponent } from './part-list-view.component';

describe('PartListViewComponent', () => {
  let component: PartListViewComponent;
  let fixture: ComponentFixture<PartListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
