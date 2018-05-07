import { h, Component } from 'preact'

class Area extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
				<h1>Showing Insights for: {this.props.q}</h1>
			</div>
		)
	}
}

export default Area
