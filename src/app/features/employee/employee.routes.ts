import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './emp-dashboard/employee-dashboard.component';
import { PartsListComponent } from './parts/parts-list.component';
import { ManageEmployeeComponent } from './emp-manage/manage-employee.component';
import { roleGuard } from '../../core/guards/role.guard';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: 'emp-dashboard',
    component: EmployeeDashboardComponent,
  },
  {
    path: 'emp-manage',
    component: ManageEmployeeComponent,
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'parts',
    component: PartsListComponent,
  },
];