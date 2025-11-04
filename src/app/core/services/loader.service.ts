import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
    private isLoading = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading.asObservable();
  
    show(){
      //this.isLoading.next(true);
      setTimeout(() => this.isLoading.next(true), 0);
    }
  
    hide(){
     // this.isLoading.next(false);
       setTimeout(() => this.isLoading.next(false), 0);
    }
}
