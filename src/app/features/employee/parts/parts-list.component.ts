import { ChangeDetectorRef, Component } from '@angular/core';
import { Part } from '../../../models/part.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PartService } from './part.service';


@Component({
  standalone:true,
  selector: 'app-parts-list',
  imports: [SharedModule],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss'
})
export class PartsListComponent {
  parts: Part[] = []; 
  displayedColumns = ['partId','pName','pPrice','pStock','actions'];
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
        this.cd.detectChanges(); // manually tell Angular to re-check view     
    }
  },
    error: () => {    
      this.snackBarService.show('Error loading Parts','error');
      this.cd.detectChanges();
    }
  });
 }

    ngAfterViewChecked() {
  console.log('AfterViewChecked: parts count', this.parts?.length);
}
 
 openPartDetails(){
  this.router.navigate(['/part/details']);
 }

 editPart(partId:any){
  console.log("posting part id to next page",partId)
  this.router.navigate(['/part/details/',partId]);
 }

 deletePart(id:number){
  if(confirm('Are you sure you wnat to delete this part?')){  
    this.partService.deletePart(id).subscribe({
    next: (res)=>{   
         this.snackBarService.show(res.message);
        if(res.success)this.loadParts; //reloads parts       
      },                  
    error: (err) => {
      this.snackBarService.show('server error occured',err);     
    }   
  })
  }
 }


 
}
