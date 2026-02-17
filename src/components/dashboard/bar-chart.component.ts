
import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const d3: any;

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="w-full h-[350px] relative" #chartContainer></div>
  `
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer') container!: ElementRef;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit() {
    this.createChart();
    this.resizeObserver = new ResizeObserver(() => {
      d3.select(this.container.nativeElement).selectAll("*").remove();
      this.createChart();
    });
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  createChart() {
    if (!this.container) return;
    const element = this.container.nativeElement;
    const margin = { top: 20, right: 0, bottom: 20, left: 0 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = element.clientHeight - margin.top - margin.bottom;

    if (width <= 0 || height <= 0) return;

    const svg = d3.select(element).append("svg")
      .attr("width", width).attr("height", height)
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
      { day: 'Mon', value: 40 }, { day: 'Tue', value: 65 },
      { day: 'Wed', value: 85 }, { day: 'Thu', value: 55 },
      { day: 'Fri', value: 70 }, { day: 'Sat', value: 35 },
      { day: 'Sun', value: 25 }
    ];

    const x = d3.scaleBand()
      .domain(data.map((d: any) => d.day))
      .range([0, width])
      .padding(0.6); // Slender bars

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Bars with rounded corners (simulated)
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d: any) => x(d.day))
      .attr("width", x.bandwidth())
      .attr("y", (d: any) => y(d.value))
      .attr("height", (d: any) => height - y(d.value))
      .attr("fill", "#3B82F6") // Blue 500
      .attr("rx", 4);

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
      .call((g: any) => g.select(".domain").remove())
      .attr("color", "#94A3B8")
      .attr("font-family", "Inter");
  }
}
