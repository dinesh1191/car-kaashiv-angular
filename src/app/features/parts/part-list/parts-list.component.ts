import { ChangeDetectorRef, Component } from '@angular/core';

import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Part } from '../../../models/part.model';
import { PartService } from '../part.service';
import { AuthService, UserProfile } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EmptyStateComponent } from "../../../shared/components/empty-state/empty-state.component";



@Component({
  standalone: true,
  selector: 'app-parts-list',
  imports: [SharedModule, EmptyStateComponent],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss',
})
export class PartsListComponent {
  parts: Part[] = [];
  displayedColumns = ['id', 'name', 'price', 'stock', 'actions'];
  userInfo: any;
  currentUser!: UserProfile | null;


  constructor(
    private partService: PartService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private authService: AuthService,

  ) {}

  ngOnInit() {
    this.loadParts();
      this.currentUser = this.authService.currentUser;
      
  }

  loadParts() {       
    this.partService.getAllParts().subscribe({
      next: (res) => {       
        if (res.success && res.data) {              
          this.parts = res.data;
        }         
      },
      error: () => {
        this.snackBarService.show('Error loading Parts', 'error');
      },
    });
  }



  navigationToAddPart() {
    this.router.navigate(['parts/addPart']);
  }

  editPart(id: any) {
    console.log('posting part id to next page', id);
    this.router.navigate(['/parts/edit', id]);
  }

  deletePart(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this part?' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.partService.deletePart(id).subscribe({
          next: (res) => {
            this.snackBarService.show(res.message);
            if (res.success) this.loadParts(); //reloads parts
          },
          error: (err) => {
            this.snackBarService.show('server error occured', err);
          },
        });
      }
    });
  }
}
