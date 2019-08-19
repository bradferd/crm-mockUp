import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
	componentDidMount() {
		this.drawChart()
	}

	drawChart() {
		// Hard coded data for the financial performance bar chart
		const data = [12, 5, 13, 10]
		let h = 160
		let w = 300

		const svg = d3
			.select('#d3')
			.append('svg')
			.attr('width', w)
			.attr('height', h)

		svg
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d, i) => i * 70)
			.attr('y', (d, i) => h - 10 * d)
			.attr('width', 69)
			.attr('height', (d, i) => d * 10)
			.attr('fill', 'steelblue')

		svg
			.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text((d, i) => `${d}0,000 Q${i + 1}`)
			.attr('x', (d, i) => i * 70)
			.attr('y', (d, i) => h - 10 * d - 3)
	}

	render() {
		return (
			<>
				<h4>Financial Performance</h4>
				<div id='d3' />
			</>
		)
	}
}

export default BarChart
