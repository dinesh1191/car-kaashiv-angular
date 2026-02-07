import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
import { Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { PartsListComponent } from './user-dashboard/parts-list/parts-list.component';
import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../shared/layout/sidebar/dashboard-layout/dashboard-layout.component';

export const USER_ROUTES: Routes = [
  
  { path: 'parts',component: PartsListComponent },
];