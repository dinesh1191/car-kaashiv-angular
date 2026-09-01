import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './emp-dashboard/employee-dashboard.component';

import { roleGuard } from '../../core/guards/role.guard';
import { EmpManageComponent } from './emp-manage/emp-manage.component';
import { OrderSummaryComponent } from '../orders/admin/order-summary/order-summary.component';

export const EMPLOYEE_ROUTES: Routes = [
  { path: 'emp-dashboard', component: EmployeeDashboardComponent}, 
  { path: 'emp-manage', component: EmpManageComponent,canActivate: [roleGuard], data: { roles: ['Admin'] }}, //only admin can access employee management page}
  { path: 'order-summary', component: OrderSummaryComponent }  
];