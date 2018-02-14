import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { WindowRefService } from './../core/window-ref.service';

@Component({
  selector: 'app-child2',
  template: './child2.component.html'
})
export class Child2Component implements OnInit {

  private _window: Window;

  constructor() {
    }

  ngOnInit() {

  }

}
