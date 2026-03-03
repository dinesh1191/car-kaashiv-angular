import { Component, OnInit } from '@angular/core';
import { AuthService, UserProfile } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-employee-dashboard',
  imports: [SharedModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent implements OnInit {
 currentUser!: UserProfile | null;
 dashboardCards: any[] = [];

 
  constructor(
    private authService:AuthService,
    private snackBarService:SnackbarService,
    private router:Router,
  ){ }
  
  ngOnInit():void{
    this.currentUser = this.authService.currentUser;
    
    this.dashboardCards = [
  {
    title:'Manage Parts',
    icon:'build',
    description:'Add,edit and manage parts inventory.',
    route:'/parts'
  },
  {    
    title:'Customer Orders',
    icon:'shopping_cart',
    description:'View and track customer orders.',
    route:'/employee/orders'
  },  
  // {       
  //   title:'Employee Management',
  //   icon:'group',
  //   description:'Add or manage employee accounts (Admin only)',
  //   route:'/employee/manage-employee'
  // }
 ]
 //only show for admins 
  if(this.currentUser?.role == 'admin'){
    this.dashboardCards.push({
      title: 'Employee Management',
      icon: 'group',
      description: 'Add or manage employee accounts (Admin only)',
      route: '/employee/manage-employee',
    });
  }
  }
  navigateTo(route:string){
    this.router.navigate([route]);
  }
 


}
