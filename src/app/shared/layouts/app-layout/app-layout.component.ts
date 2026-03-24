import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, UserProfile } from '../../../core/services/auth.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material';
import { PRIME_IMPORTS } from '../../prime';

import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthFacade } from '../../../core/services/auth.facade';
@Component({
  selector: 'app-app-layout',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    ...PRIME_IMPORTS,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  currentUser!: UserProfile | null;
  sidebarVisible = false;
  userItems: any[] = [];
  //for sidebar menu items
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/user/dashboard' },
    { label: 'Settings', icon: 'pi pi-list', route: '/user/parts' },
    { label: 'Profile', icon: 'pi pi-shopping-cart', route: '/user/cart' },
  ];

  constructor(
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private authfacade :AuthFacade
  ) {}
  ngOnInit() {
    this.currentUser = this.authService.currentUser;

    this.userItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          this.onProfile();
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          this.onSettings();
        },
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onLogout();
        },
      },
    ];
  }
  onProfile() {
    console.log('Profile clicked');
  }

  onLogout() {
    console.log('Logout clicked');
     this.confirmationService.confirm({
      header:'Confirm Logout',
      message:'Are you sure you want to logout?',
      icon:'pi pi-sign-out',
      acceptLabel:'Logout',
      rejectLabel:'Cancel',
      accept:()=>{
        this.authfacade.logout();
      }
     });    
  }

  onSettings() {
    console.log('Settings clicked');
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
