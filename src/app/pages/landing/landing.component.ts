import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ServerStatusBannerComponent } from '../../shared/components/server-status-banner/server-status-banner.component';
import { ServerStatusService } from '../../core/services/server-status.service';
import { HealthService } from '../../core/services/health.service';
import { ConfirmationService } from 'primeng/api';
import { AuthFacade } from '../../core/services/auth.facade';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';

@Component({
  selector: 'app-landing',
  imports: [
    ...MATERIAL_IMPORTS,
    RouterLink,
    CommonModule,
    OrderSummaryComponent,
    ServerStatusBannerComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  currentUser: any;
  paymentList = [
    {
      name: 'Ramesh Kumar',
      phone: '+91 9876543210',
      orderId: '1023',
      date: '24 May 2025, 10:30 AM',
      method: 'UPI',
      utr: '1234',
      amount: 450,
      status: 'Paid',
      logo: 'assets/gpay.png',
    },
    {
      name: 'Anita R',
      phone: '+91 91234 56789',
      orderId: 1025,
      date: '25 May 2025, 02:15 PM',
      method: 'PhonePe',
      utr: 7890,
      amount: '1,250.00',
      status: 'Pending',
      logo: 'assets/paytm.png',
    },
    {
      name: 'Karthik M',
      phone: '+91 99876 54321',
      orderId: 1026,
      date: '26 May 2025, 09:45 AM',
      method: 'Paytm',
      utr: 3456,
      amount: '600.00',
      status: 'Paid',
      logo: 'assets/upi.png',
    },
    {
      name: 'Priya S',
      phone: '+91 98765 43210',
      orderId: 1027,
      date: '27 May 2025, 05:30 PM',
      method: 'NetBanking',
      utr: 2345,
      amount: '2,000.00',
      status: 'Rejected',
      logo: 'assets/gpay.png',
    },
    {
      name: 'Rahul D',
      phone: '+91 87654 12345',
      orderId: 1028,
      date: '28 May 2025, 07:20 PM',
      method: 'Credit Card',
      utr: 4567,
      amount: '3,500.00',
      status: 'Paid',
      logo: 'assets/upi.png',
    },
  ];
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
