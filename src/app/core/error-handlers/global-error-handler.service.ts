import {  ErrorHandler,Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {

    const message = String(error);
    const isChunkLoadError =
      message.includes('Loading chunk') ||
      message.includes('Failed to fetch dynamically imported module');

    if (isChunkLoadError) {
      const alreadyReloaded = sessionStorage.getItem('chunkLoadErrorReloaded');

      if (!alreadyReloaded) {
        sessionStorage.setItem('chunkLoadErrorReloaded', 'true');
        console.warn('Chunk loading failed. Reloading application.', error);
        window.location.reload();
        return;
      }
      console.error('An unexpected error occurred:', error);
      alert(
        'A new version of the application is available.Please Clear your browser cache and reload the page.',
      );
      return;
    }
    console.error("global error:",error);
  }
}