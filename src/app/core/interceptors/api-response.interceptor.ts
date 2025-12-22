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

catchError((error: HttpErrorResponse) => {
  // Define a lookup map for common HTTP status codes and their corresponding error messages
  const statusMessages: Record<number, string> = {
      0: 'Server not reachable',               // Network failure or CORS issue
    401: 'Unauthorized - Please login again',  // Authentication required
    403: 'Access denied',                      // User lacks permission
    500: 'Server error'                       // Internal server error
  };

  // Determine the error message:
  // 1. Use the server-provided error message if available
  // 2. Otherwise, use the message from the status map
  // 3. Fallback to a generic message if nothing matches
  const errorMsg = error.error?.message || statusMessages[error.status] || 'An unknown error occurred';
 // Show the error message in the UI
  snackBar.show(errorMsg, 'error');
  // Re-throw the error so it can be handled downstream if needed
  return throwError(() => error);
}),

    finalize(()=>{
      if(!skipLoader)loaderService.hide()//hide loader when request ends
      }
    )
  )
}


