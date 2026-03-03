import { ChangeDetectorRef, Component } from '@angular/core';

import { PartService } from './part.service';
import { SharedModule } from '../../shared/shared.module';
import { Part } from '../../models/part.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';


@Component({
  standalone:true,
  selector: 'app-parts-list',
  imports: [SharedModule],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss'
})
export class PartsListComponent {
  parts: Part[] = []; 
  displayedColumns = ['id','name','price','stock','actions'];
  userInfo: any;

constructor(
  private partService :PartService,
  private authService :AuthService,
  private router:Router, 
  private snackBarService :SnackbarService,
  private cd :ChangeDetectorRef
) {}

 ngOnInit(){
   this.loadParts(); 
 }

 loadParts(){  
  this.partService.getAllParts().subscribe({
    next:(res) => {   
      console.log("parts loaded after:",performance.now());
      if(res.success && res.data){
        this.parts = res.data;       
      }
  },
    error: () => {    
      this.snackBarService.show('Error loading Parts','error');
    }
  });
 }

//     ngAfterViewChecked() {
//   console.log('AfterViewChecked: parts count', this.parts?.length);
// }
 
 openPartDetails(){
  this.router.navigate(['parts/details']);
 }

 editPart(id:any){
  console.log("posting part id to next page",id)
  this.router.navigate(['/parts/details',id]);
 }

 deletePart(id:number){
  if(confirm('Are you sure you wnat to delete this part?')){  
    this.partService.deletePart(id).subscribe({
    next: (res)=>{   
         this.snackBarService.show(res.message);
        if(res.success) this.loadParts(); //reloads parts       
      },                  
    error: (err) => {
      this.snackBarService.show('server error occured',err);     
    }   
  })
  }
 }


 
}
