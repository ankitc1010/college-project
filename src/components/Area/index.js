import { h, Component } from 'preact'
import * as d3 from 'd3'
import kjs from 'keras-js'
import axios from 'axios'
import FirstGraph from './firstGraph'
import SecondGraph from './secondGraph'
import ThirdGraph from './thirdGraph'
import FourthGraph from './fourthGraph'
class Area extends Component {
	state = {
		results: ['Loading'],
		score: 'Loading',
		set: false,
		fifty: 0,
		sixty: 0,
		seventy: 0
	}
	componentDidMount() {
		axios
			.post('/api/area', { area: this.props.q })
			.then(res => {
				console.log(res)
				this.setState({
					results: res.data.results,
					score: res.data.score,
					filteredData: res.data.filteredData,
					set: true,
					fifty: res.data.fifty,
					sixty: res.data.sixty,
					seventy: res.data.seventy
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	renderData = () => {
		return this.state.results.map(d => {
			return <div>{d}</div>
		})
	}
	render() {
		console.log(this.props)
		return (
			<div>
				{this.renderData()}
				<FirstGraph score={this.state.score} />
				<h4>
					<center>Pothole Score</center>
				</h4>
				<h1>
					<center>{this.props.q}</center>
				</h1>
				<FourthGraph
					set={this.state.set}
					fifty={this.state.fifty}
					sixty={this.state.sixty}
					seventy={this.state.seventy}
				/>
				<ThirdGraph />
			</div>
		)
	}
}

export default Area
