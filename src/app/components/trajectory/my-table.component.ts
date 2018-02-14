import { Component } from '@angular/core';
import { DomService } from './../../core/dom.service';
import { WindowRefService } from './../../core/window-ref.service';
import { GridOptions } from 'ag-grid';
import { RedComponent } from './red.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html'
})
export class MyTableComponent {

  private _window: Window;

  public gridOptions: GridOptions;

  constructor(
    private domService: DomService,
    private windowRefService: WindowRefService
  ) {
    this._window = this.windowRefService.nativeWindow;
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 100
      },
      {
        headerName: 'Value',
        field: 'value',
        cellRendererFramework: RedComponent,
        width: 100
      },

    ];
    this.gridOptions.rowData = [
      { id: 5, value: 10 },
      { id: 10, value: 15 },
      { id: 15, value: 20 }
    ];
  }

  newWindow(): void {
    const newWindow = this._window.open('', 'newWindow', 'menubar=0,location=0,status=0,width=500,height=400');
    // angular.element($scope.window.document.body).append($compile('<div>{{var}}</div>')($scope));
    let inner = '';
    for (let z = 0; z < this._window.document.head.childNodes.length; z++) {
      if (this._window.document.head.childNodes[z].nodeName === 'STYLE') {
        inner += this._window.document.head.childNodes[z].firstChild.parentElement.innerText;
      }
    }
    const elem: HTMLElement = {};
    elem.innerText = inner;
    newWindow.document.head.appendChild(elem);
    newWindow.document.body.appendChild(
      this.domService.appendComponentToBody(MyTableComponent, null, null)
    );
  }
}
