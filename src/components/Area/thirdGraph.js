import { h, Component } from 'preact'
//var Plotly = require('plotly')('nahuahc', '0K8jdkUhi031JeCo9c8X')
import file from './dataset0.csv'
class ThirdGraph extends Component {
	componentDidMount() {
		Plotly.d3.csv(`../${file}`, function(err, rows) {
			function unpack(rows, key) {
				return rows.map(function(row) {
					return row[key]
				})
			}

			var trace1 = {
				x: unpack(rows, 'latitude'),
				y: unpack(rows, 'longitude'),
				z: unpack(rows, 'pothole'),
				mode: 'markers',
				marker: {
					size: 5,
					line: {
						color: 'rgba(217, 217, 217, 0.14)',
						width: 0.5
					},
					opacity: 0.8
				},
				type: 'scatter3d'
			}

			// var trace2 = {
			// 	x: unpack(rows, 'x2'),
			// 	y: unpack(rows, 'y2'),
			// 	z: unpack(rows, 'z2'),
			// 	mode: 'markers',
			// 	marker: {
			// 		color: 'rgb(127, 127, 127)',
			// 		size: 12,
			// 		symbol: 'circle',
			// 		line: {
			// 			color: 'rgb(204, 204, 204)',
			// 			width: 1
			// 		},
			// 		opacity: 0.8
			// 	},
			// 	type: 'scatter3d'
			// }

			var data = [trace1]
			var layout = {
				margin: {
					l: 0,
					r: 0,
					b: 0,
					t: 0
				}
			}
			Plotly.newPlot('plotly', data, layout)
		})
	}
	render() {
		return <div id="plotly" />
	}
}

export default ThirdGraph
