import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { PartService } from '../../../parts/part.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";


@Component({
  selector: 'app-user-part-list',
  imports: [SharedModule, EmptyStateComponent],
  templateUrl: './user-part-list.component.html',
  styleUrl: './user-part-list.component.scss'
})
export class UserPartListComponent implements OnInit {
   parts: any[] = [];
constructor(private partService: PartService,
  private snackbarService:SnackbarService,
){

}
  ngOnInit(): void {
    this.loadParts();
  }
  loadParts(){
    this.partService.getAllParts().subscribe({
      next:(res)=>{
        this.parts = res.data?? [];//if data exists → use it.undefined fallback to empty array
     this.parts[0].imageUrl = 'assets/shared/fake-image.png';   
      },
      error(err){
      console.error('Failed to load parts',err)
    }
    });
  }

  OnImageError(event:any,part: any){    
    const img = event.target;
    //prevent infinite Loop
    if (part.imageUrl === 'assets/no-image-available.png') return;
  part.imageUrl = 'assets/no-image-available.png';
  }
}
