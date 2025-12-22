import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStatusBannerComponent } from './server-status-banner.component';

describe('ServerStatusBannerComponent', () => {
  let component: ServerStatusBannerComponent;
  let fixture: ComponentFixture<ServerStatusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerStatusBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerStatusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
