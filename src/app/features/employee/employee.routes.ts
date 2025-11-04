import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './emp-dashboard/employee-dashboard.component';
import { PartsListComponent } from './parts/parts-list.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

export const EMPLOYEE_ROUTES: Routes = [
  { path: '', component: EmployeeDashboardComponent, canActivate: [authGuard] },
  { path: 'parts', component: PartsListComponent, canActivate: [authGuard] },
  
  {
    path: 'manage-employee',
    component: ManageEmployeeComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] },
  },
];
