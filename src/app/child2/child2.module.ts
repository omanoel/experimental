import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { Child2RoutingModule } from './child2-routing.module';
import { Child2Component } from './child2.component';

import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    Child2RoutingModule,
    GridsterModule,
    DynamicModule.withComponents([
    ])
  ],
  declarations: [
    Child2Component
  ],
  exports: [
  ],
  providers: [
  ]
})
export class Child2Module { }
