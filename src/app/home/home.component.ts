import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { WindowRefService } from './../core/window-ref.service';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { My1Component } from './my-components/my1.component';
import { My2Component } from './my-components/my2.component';
import { MyTableComponent } from './../components/trajectory/my-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _window: Window;

  quote: string;
  isLoading: boolean;

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  monDataset: any = {
    maValeur: {
      valeur: '455'
    }
  };

  component = My1Component;

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }
  constructor(
    private quoteService: QuoteService,
    private windowRefService: WindowRefService) {
    this._window = this.windowRefService.nativeWindow;
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });

    this.options = {
      itemChangeCallback: HomeComponent.itemChange,
      itemResizeCallback: HomeComponent.itemResize,
      gridType: 'scrollVertical',
      scrollToNewItems: true
    };

    this.dashboard = [
      {
        cols: 2,
        rows: 1,
        y: 0,
        x: 0,
        dragEnabled: true,
        resizeEnabled: true,
        compactEnabled: false,
        component: My1Component,
        dataset: this.monDataset
      },
      {
        cols: 2,
        rows: 2,
        y: 0,
        x: 2,
        dragEnabled: true,
        resizeEnabled: true,
        compactEnabled: false,
        component: My1Component,
        dataset: this.monDataset
      }
    ];
  }
  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({
      cols: 1,
      rows: 1,
      y: 2,
      x: 2,
      dragEnabled: true,
      resizeEnabled: true,
      compactEnabled: false,
      component: My2Component,
      dataset: this.monDataset
    });
  }
  addTableItem() {
    this.dashboard.push({
      cols: 1,
      rows: 1,
      y: 2,
      x: 2,
      dragEnabled: true,
      resizeEnabled: true,
      compactEnabled: false,
      component: MyTableComponent,
      dataset: this.monDataset
    });
  }
}
