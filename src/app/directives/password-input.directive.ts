import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appPasswordInput]'
})
export class PasswordInputDirective {

  show: boolean;
  constructor(private el: ElementRef) {
    this.setup();
   }

   setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `Show password`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
   }

   toggle(span: HTMLElement) {
    this.show = !this.show;
    if (this.show) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide password';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show password';
    }
   }
   
}
