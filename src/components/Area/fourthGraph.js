import { h, Component } from "preact"
//var Plotly = require('plotly')('nahuahc', '0K8jdkUhi031JeCo9c8X')
import file from "./dataset.csv"
class ThirdGraph extends Component {
  renderGraph = () => {
    if (this.props.set) {
      var d3 = Plotly.d3

      var WIDTH_IN_PERCENT_OF_PARENT = 60,
        HEIGHT_IN_PERCENT_OF_PARENT = 80

      var gd3 = d3
        .select("#fourth")
        .append("div")
        .style({
          width: WIDTH_IN_PERCENT_OF_PARENT + "%",
          "margin-left": (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + "%",

          height: HEIGHT_IN_PERCENT_OF_PARENT + "vh",
          "margin-top": (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + "vh"
        })

      var gd = gd3.node()

      Plotly.plot(gd, [
        {
          type: "bar",
          x: [50, 60, 70],
          y: [this.props.fifty, this.props.sixty, this.props.seventy],
          marker: {
            color: "#C8A2C8",
            line: {
              width: 2.5
            }
          }
        }
      ])
      return null
    }
    return null
  }
  render() {
    return <div id="fourth">{this.renderGraph()} </div>
  }
}

export default ThirdGraph
