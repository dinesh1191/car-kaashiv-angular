import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../material';
import { PRIME_IMPORTS } from '../../../prime';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS,
    ...PRIME_IMPORTS, RouterLink, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
 sidebarVisible = false;
userItems:any[]=[];
//for sidebar menu items
 menuItems = [
   { label: 'Dashboard', icon: 'pi pi-home', route: '/user/dashboard' },
   { label: 'Settings', icon: 'pi pi-list', route: '/user/parts' },
   { label: 'Profile', icon: 'pi pi-shopping-cart', route: '/user/cart' }
 ];

 ngOnInit() {
  
  this.userItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {this.onProfile() }
    }, 
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => {this.onSettings()}
    },   
      { separator: true },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {this.onLogout()}
    }
  ];
 }


  onProfile() {
    console.log('Profile clicked');
  }
  onLogout() {
    console.log('Logout clicked');
  }
  onSettings() {
    console.log('Settings clicked');
  } 


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


}
