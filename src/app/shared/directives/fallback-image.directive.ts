import { Directive, ElementRef, Host, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFallbackImage]'
})
export class FallbackImageDirective {

  @Input() fallbackSrc: string = 'assets/no-image-available2.png';

  constructor(private el:ElementRef<HTMLImageElement>) { }

 @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.fallbackSrc;
  } 
}
