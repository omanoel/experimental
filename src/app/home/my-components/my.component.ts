import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: 'my.component.html'
})

export class MyComponent {

  @Input() maValeur: any;

  onSubmit(): void {

  }

}
