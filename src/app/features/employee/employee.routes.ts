import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './emp-dashboard/employee-dashboard.component';
import { PartsListComponent } from './parts/parts-list.component';
import { roleGuard } from '../../core/guards/role.guard';
import { EmpManageComponent } from './emp-manage/emp-manage.component';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: 'emp-dashboard',
    component: EmployeeDashboardComponent,
  },
  {
    path: 'emp-manage',
    component: EmpManageComponent,
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'parts',
    component: PartsListComponent,
  },
];