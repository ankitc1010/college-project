import { h, Component } from 'preact'
import graph from './graph.tsv'
import * as d3 from 'd3'
class firstGraph extends Component {
	componentDidMount() {
		console.log('Graph ', graph)
		var margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom

		var x = d3.scale.linear().range([0, width])

		var y = d3.scale.linear().range([height, 0])

		var color = d3.scale.category10()

		var xAxis = d3.svg
			.axis()
			.scale(x)
			.orient('bottom')

		var yAxis = d3.svg
			.axis()
			.scale(y)
			.orient('left')

		var svg = d3
			.select('.second')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

		d3.tsv(`../${graph}`, function(error, data) {
			if (error) throw error

			data.forEach(function(d) {
				d.sepalLength = +d.sepalLength
				d.sepalWidth = +d.sepalWidth
			})

			x
				.domain(
					d3.extent(data, function(d) {
						return d.sepalWidth
					})
				)
				.nice()
			y
				.domain(
					d3.extent(data, function(d) {
						return d.sepalLength
					})
				)
				.nice()

			svg
				.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis)
				.append('text')
				.attr('class', 'label')
				.attr('x', width)
				.attr('y', -6)
				.style('text-anchor', 'end')
				.text('Longitude')

			svg
				.append('g')
				.attr('class', 'y axis')
				.call(yAxis)
				.append('text')
				.attr('class', 'label')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '.71em')
				.style('text-anchor', 'end')
				.text('Latitude')

			svg
				.selectAll('.dot')
				.data(data)
				.enter()
				.append('circle')
				.attr('class', 'dot')
				.attr('r', 3.5)
				.attr('cx', function(d) {
					return x(d.sepalWidth)
				})
				.attr('cy', function(d) {
					return y(d.sepalLength)
				})
				.style('fill', function(d) {
					return color(d.species)
				})

			var legend = svg
				.selectAll('.legend')
				.data(color.domain())
				.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i) {
					return 'translate(0,' + i * 20 + ')'
				})

			legend
				.append('rect')
				.attr('x', width - 18)
				.attr('width', 18)
				.attr('height', 18)
				.style('fill', color)

			legend
				.append('text')
				.attr('x', width - 24)
				.attr('y', 9)
				.attr('dy', '.35em')
				.style('text-anchor', 'end')
				.text(function(d) {
					if (d === 'setosa') {
						return '20-30'
					} else if (d === 'vesicolor') {
						return '30-40'
					} else {
						return '40-50'
					}
				})
		})
	}
	render() {
		console.log(this.props)
		return <div class="second" />
	}
}

export default firstGraph
