import { h, Component } from 'preact'
import { route } from 'preact-router'
import './styles.scss'
class Home extends Component {
	state = {
		areaName: 'Indira Nagar'
	}
	submitArea = e => {
		e.preventDefault()
		route('/area/' + this.state.areaName)
	}
	changeArea = e => {
		this.setState({
			areaName: e.target.value
		})
	}
	render() {
		return (
			<div>
				<div class="main-heading">
					<h1>Pothole Detection</h1>
					<h2>Search in the area to get details of</h2>
					<form onSubmit={this.submitArea}>
						<div class="input-div">
							<select id="input-hash" onChange={this.changeArea}>
								<option value="Indira Nagar">Indira Nagar</option>
								<option value="Banashankari">Banashankari</option>
							</select>
						</div>
						<div class="button">
							<input type="submit" id="submit" />
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Home
