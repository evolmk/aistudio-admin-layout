
import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const d3: any;

@Component({
  selector: 'app-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="w-full h-[300px] relative" #chartContainer></div>
  `
})
export class ChartComponent implements AfterViewInit, OnDestroy {
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
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  createChart() {
    if (!this.container) return;

    const element = this.container.nativeElement;
    const margin = { top: 20, right: 0, bottom: 30, left: 0 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = element.clientHeight - margin.top - margin.bottom;

    if (width <= 0 || height <= 0) return;

    const svg = d3.select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Data generation to match the smooth "hump" in the image
    const points = 15;
    const data = Array.from({ length: points }, (_, i) => {
      // Create a smooth curve with some peaks
      let val = 150 + Math.sin(i / 2) * 100 + Math.random() * 20;
      if (i > 5 && i < 10) val += 100; // The big hump in the middle
      return {
        date: new Date(2024, 3, i * 2 + 1), // April dates
        value: Math.max(50, val)
      };
    });

    const x = d3.scaleTime()
      .domain(d3.extent(data, (d: any) => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 400])
      .range([height, 0]);

    // Gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "blue-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0.4);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0);

    const area = d3.area()
      .x((d: any) => x(d.date))
      .y0(height)
      .y1((d: any) => y(d.value))
      .curve(d3.curveMonotoneX); // Very smooth curve

    const line = d3.line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#blue-gradient)")
      .attr("d", area);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 3)
      .attr("d", line);

    // X Axis
    const xAxis = d3.axisBottom(x)
        .ticks(10)
        .tickFormat(d3.timeFormat("%b %d"))
        .tickSize(0)
        .tickPadding(15);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .call((g: any) => g.select(".domain").remove())
      .attr("font-family", "Inter")
      .attr("font-size", "10px")
      .attr("color", "#94A3B8");

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).ticks(0).tickSize(-width)) // No Y labels, just grid if needed (removing for clean look)
      .call((g: any) => g.select(".domain").remove())
      .selectAll("line").remove(); // Actually removing grid lines for the super clean look in screenshot
  }
}
