import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
	componentDidMount() {
		this.drawChart()
	}

	drawChart() {
		const data = [12, 5, 6, 6, 9, 10]
		let h = 200
		let w = 320

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
			.attr('width', 35)
			.attr('height', (d, i) => d * 10)
			.attr('fill', 'green')

		svg
			.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(d => d)
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
