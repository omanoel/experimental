import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import * as projects from './projects.json';
import * as fields from './fields.json';

import { Dataset } from './../interfaces';

@Injectable()
export class DatasetService {

  public dataset: Dataset;

  constructor() { }

  load(): Dataset {
    this.dataset = {
      _projects: projects.projects,
      chartData: []
    };
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.dataset.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
    return this.dataset;
  }

}
