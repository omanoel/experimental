import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';

import { AgGridModule } from 'ag-grid-angular/main';

import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';

import { MyComponent } from './my-components/my.component';
import { My1Component } from './my-components/my1.component';
import { My2Component } from './my-components/my2.component';
import { MyTableComponent } from '../components/trajectory/my-table.component';
import { RedComponent } from '../components/trajectory/red.component';

import { AreaChartComponent } from './../d3/area-chart/area-chart.component';
import { DatasetService } from '../shared/dataset/dataset.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    GridsterModule,
    DynamicModule.withComponents([
      MyComponent, My1Component, My2Component, MyTableComponent
    ]),
    AgGridModule.withComponents([
      RedComponent
    ])
  ],
  declarations: [
    HomeComponent,
    MyComponent,
    My1Component,
    My2Component,
    AreaChartComponent,
    MyTableComponent,
    RedComponent
  ],
  exports: [
  ],
  providers: [
    QuoteService,
    DatasetService
  ]
})
export class HomeModule { }
