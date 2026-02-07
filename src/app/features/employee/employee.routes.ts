import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './emp-dashboard/employee-dashboard.component';
import { PartsListComponent } from './parts/parts-list.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
import { EmpRegisterFormComponent } from './emp-register-form/emp-register-form.component';
import { DashboardLayoutComponent } from '../../shared/layout/sidebar/dashboard-layout/dashboard-layout.component';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: 'register-employee',
    component: EmpRegisterFormComponent,
  },
  {
    path: 'manage-employee',
    component: ManageEmployeeComponent,
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'parts',
    component: PartsListComponent,
  },
];