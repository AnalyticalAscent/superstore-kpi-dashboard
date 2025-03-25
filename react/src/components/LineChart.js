import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// This component receives a 'data' prop: an array of objects like
// [{ date: "2022-01-01", value: 85175 }, { date: ..., value: ... }]
const LineChart = ({ data }) => {
  // useRef creates a persistent reference to the <svg> DOM element
  const ref = useRef();

  // useEffect will run the chart drawing logic once component mounts or data updates
  useEffect(() => {
    // Select the SVG using ref, and remove any previous chart content
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    // === 1. Set chart dimensions and margins ===
    const width = 500;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // === 2. Parse date strings into JS Date objects ===
    const parseDate = d3.timeParse('%Y-%m-%d');
    const formattedData = data.map((d) => ({
      date: parseDate(d.date),
      value: d.value
    }));

    // === 3. Create scales ===
    const x = d3
      .scaleTime()
      .domain(d3.extent(formattedData, (d) => d.date)) // extent = [min, max]
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // === 4. Create the line generator ===
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    // === 5. Append X axis ===
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%b %Y')))
      .selectAll('text')
      .attr('transform', 'rotate(-30)')
      .style('text-anchor', 'end');

    // === 6. Append Y axis ===
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5));

    // === 7. Append the line path ===
    svg
      .append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', '#007acc')
      .attr('stroke-width', 2.5)
      .attr('d', line);
  }, [data]); // Rerun the effect when `data` changes

  // Render the SVG element where D3 will draw
  return <svg ref={ref} width={500} height={250}></svg>;
};

export default LineChart;
