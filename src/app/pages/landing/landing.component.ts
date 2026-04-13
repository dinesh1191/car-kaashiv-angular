import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ServerStatusBannerComponent } from "../../shared/components/server-status-banner/server-status-banner.component";
import { ServerStatusService } from '../../core/services/server-status.service';
import { HealthService } from '../../core/services/health.service';
import { ConfirmationService } from 'primeng/api';
import { AuthFacade } from '../../core/services/auth.facade';


@Component({
  selector: 'app-landing',
  imports: [
    ...MATERIAL_IMPORTS,
    RouterLink,
    CommonModule,
    ServerStatusBannerComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  currentUser: any;
  constructor(
    private healthService: HealthService,
    private serverStatusService: ServerStatusService,
    private authService: AuthService,
    private router: Router,
     ) {}

  slides = [
    {
      icon: 'build',
      title: 'Parts Management',
      description: 'Track, Update and organisze automotive parts effortlessly.',
    },
    {
      icon: 'groups',
      title: 'Employee Control',
      description: 'Mange employee role and permissions with ease',
    },
    {
      icon: 'insights',
      title: 'Perforamance Analytics',
      description: 'Gain real-time insights into your business performance',
    },
  ];
  currentSlide = 0;

  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000);
    console.log('Landing Component Initialized');

    //get server health/startup
    this.healthService.getServerHealth().subscribe({
      next: (res) => {
        if (res === 'Healthy') {
          this.serverStatusService.markHealthy(); // for updating the service status
        }
      },
      error: (err) => {
        this.serverStatusService.markUnHealthy();
        console.error('Server health check failed:', err);
      },
    });

    this.currentUser = this.authService.currentUser;
  }

  nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1 + this.slides.length) % this.slides.length;
  }
  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToDashboard() {
    const role = this.currentUser?.role;
    if (role == 'admin' || role == 'employee') {
      this.router.navigate(['/employee/emp-dashboard']);
    } else if (role == 'customer') {
      this.router.navigate(['/user/parts-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}


