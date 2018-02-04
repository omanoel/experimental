import { Component, Input } from '@angular/core';
import { DomService } from './../../core/dom.service';
import { WindowRefService } from './../../core/window-ref.service';
import { MyComponent } from './my.component';

@Component({
  selector: 'app-my2-component',
  templateUrl: 'my2.component.html'
})

export class My2Component {

  private _window: Window;

  @Input() maValeur: any;

 /* @Input() hello: string;
  @Input() something: Function;
  @Output() onSomething = new EventEmitter<string>();
  */

  constructor(
    private domService: DomService,
    private windowRefService: WindowRefService
  ) {
    this._window = this.windowRefService.nativeWindow;
  }
  newWindow(): void {
    const newWindow = this._window.open('', '_blank', 'width=500,height=400');
    // angular.element($scope.window.document.body).append($compile('<div>{{var}}</div>')($scope));
    newWindow.document.body.appendChild(this.domService.appendComponentToBody(MyComponent, 'maValeur', this.maValeur));
  }
}
