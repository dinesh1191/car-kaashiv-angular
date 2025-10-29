import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { PartService } from '../services/part.service';
import { Part } from '../../../models/part.model';
import { PartsFormComponent } from '../components/parts-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule}from '@angular/material/progress-spinner';
import { HttpClient, } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-parts-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,   
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss'
})
export class PartsListComponent {
  parts: Part[] = [];
  loading = true;
  displayedColumns = ['partId','pName','pPrice','pStock','actions'];
  userInfo: any;

constructor(
  private partService :PartService,
  private authService :AuthService,
  private router:Router,
  private dialog:MatDialog,
  private snackBar:MatSnackBar
) {}

 ngOnInit(){
  this.loadParts();  
  
 }

 loadParts(){
  this.loading = true;
  this.partService.getAllParts().subscribe({
    next:(res) => {   
      if(res.success && res.data){
        this.parts = res.data;
        this.loading = false;
      }      
    },
    error: () => {
      this.loading = false;
      this.snackBar.open('Error loading Parts','Close',{duration:3000});

    }
  });
 }
 //For update part
 openFormDialog(part?:Part){
  const dialogRef = this.dialog.open(PartsFormComponent, {
     width: '400px',
     data:part || null
  });
    dialogRef.afterClosed().subscribe((res)=>{
      if(res){
        if(res.part_id){
          this.partService.updatePart(res.ppartId,res).subscribe((res)=>
            {
              if(res.success)this.loadParts();
            })
        }
      }
    });
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
        this.snackBar.open(res.message,'Close',{duration:3000});
        if(res.success)this.loadParts; //reloads parts       
      },                  
    error: (err) => {
      this.snackBar.open(err,'server error occured');     
    }   
  })
  }
 }
 getuserInfo(){
  this.authService.getProfileDetails().subscribe({
    next: (res)=>{
      if(res.success){
      this.userInfo = res.data;
      console.log(this.userInfo,"this.userInfo");
      }       
    }
  })
 }

 onLogout(){
    this.authService.logout().subscribe({
      next:(res)=>{       
        if(res.success)this.router.navigate(['/auth'])
           this.snackBar.open(res.message,'Close',{duration:3000});
      },
       error: (err) => {
      this.snackBar.open(err,'server error occured');     
    } 
    })
   }

}
