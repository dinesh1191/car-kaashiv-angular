import {
   HttpEvent,
   HttpInterceptor,
   HttpHandler,
   HttpRequest,
   HttpResponse,
   HttpErrorResponse,
   HttpInterceptorFn,
   HttpContextToken
  } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError,finalize,map,tap} from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { ApiResponse } from '../../models/api-response.model';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
export const SKIP_LOADER = new HttpContextToken(()=> false);

export const apiResponseInterceptor : HttpInterceptorFn=(req,next)=>{
  const snackBar =  inject(SnackbarService);
  const loaderService = inject(LoaderService);


  
  //skip Loader if request has special header
  const skipLoader = req.headers.has('SKIP_LOADER');

  if(!skipLoader)loaderService.show();

const authReq = req.clone({withCredentials:true}); //include http credentials(cookies)

  return next(authReq).pipe(
    tap(event => {
      if(event instanceof HttpResponse){
        const body = event.body as ApiResponse<any>;
        if(body && body.message && body.success){          
        snackBar.show(body.message,'success');
        }
      }
    }),

    catchError((error:HttpErrorResponse) => {
      let errorMsg = 'An unknown error occurred';

      if(error.error?.message){
        errorMsg = error.error.message;
      } 
      else if(error.status === 0){
          errorMsg = 'Server not reachable';
      }
      else if (error.status === 401){
        errorMsg = 'Unauthorized - Please login again';
      }
      else if(error.status === 403){
        errorMsg = 'Access denied';
      }
      else if (error.status === 500){
        errorMsg = 'server error';
      }
      console.warn('Hey body it prints');
      
    snackBar.show(errorMsg,'error');
      return throwError(()=>error);
    }),
    finalize(()=>{
      if(!skipLoader)loaderService.hide()//hide loader when request ends
      }
    )
  )
}


