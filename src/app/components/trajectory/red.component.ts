import { Component } from '@angular/core';

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html'
})
export class RedComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

}
