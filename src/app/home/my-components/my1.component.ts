import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my1-component',
  templateUrl: 'my1.component.html'
})

export class My1Component {
  @Input() maValeur: any;
}
