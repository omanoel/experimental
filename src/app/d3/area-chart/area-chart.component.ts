import {
  Component, OnInit, OnChanges, OnDestroy,
  ViewChild, ElementRef, Input, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { DatasetService } from './../../shared/dataset/dataset.service';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AreaChartComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private dataSource: Array<any>;

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private observer: Observable<number>;
  private subscription: Subscription;

  constructor(private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.getData();
    this.createChart();
    this.observer = Observable.interval(5000);
    this.subscription = this.observer.subscribe((i: number) => {
      this.getData();
      this.updateChart();
    });
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getData(): void {
    this.dataSource = this.datasetService.load().chartData;
  }

  createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.dataSource.map(d => d[0]);
    const yDomain = [0, d3.max(this.dataSource, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.dataSource.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.dataSource.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.dataSource, d => d[1])]);
    this.colors.domain([0, this.dataSource.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.dataSource);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('width', (d: any) => this.xScale.bandwidth())
      .attr('height', (d: any) => this.height - this.yScale(d[1]))
      .style('fill', (d: any, i: any) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d: any, i: any) => this.colors(i))
      .transition()
      .delay((d: any, i: any) => i * 10)
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('height', (d: any) => this.height - this.yScale(d[1]));
  }

}
