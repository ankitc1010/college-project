var express = require('express')
var path = require('path')
var PythonShell = require('python-shell')
var csv = require('node-csv').createParser()
var router = express.Router()

PythonShell.run('script.py', { scriptPath: __dirname }, function(err, results) {
	// script finished
	console.log(err, results)
	// res.send(results)
})

console.log(__dirname)
router.get('/', (req, res) => {
	PythonShell.run('script.py', { scriptPath: __dirname }, function(
		err,
		results
	) {
		// script finished
		console.log(err, results)
		res.send(results)
	})
})

router.post('/', (req, res) => {
	console.log('here')
	console.log(req.body)
	var objData = [
		{
			name: 'Indira Nagar',
			score: 100,
			latitudeTop: '13.010509',
			latitudeBottom: '12.946515',
			longitudeLeft: '77.600937',
			longitudeRight: '77.681421'
		},
		{
			name: 'Banashankari',
			latitudeTop: '12.943587',
			latitudeBottom: '12.908422',
			longitudeLeft: '77.515259',
			longitudeRight: '77.573763'
		}
	]
	var s = objData.find(a => a.name === req.body.area)
	console.log(s)

	PythonShell.run('script.py', { scriptPath: __dirname }, function(
		err,
		results
	) {
		csv.mapFile(__dirname + '/dataset.csv', function(err, data) {
			console.log(data)
			var addedWeights = data.map(a => {
				if (a.Pothole < 15) {
					return { ...a, weight: 1 }
				} else if (a.Pothole < 20) {
					return { ...a, weight: 2 }
				} else if (a.Pothole < 25) {
					return { ...a, weight: 3 }
				} else if (a.Pothole < 30) {
					return { ...a, weight: 4 }
				} else {
					return { ...a, weight: 5 }
				}
			})
			console.log(addedWeights)
			console.log('hey this is s', s)
			var filteredData = addedWeights.filter(a => {
				console.log(
					a.Longitude > s.longitudeLeft && a.Longitude < s.longitudeRight
				)
				return (
					a.Longitude > s.longitudeLeft &&
					a.Longitude < s.longitudeRight &&
					a.Lattitude < s.latitudeTop &&
					a.Lattitude > s.latitudeBottom
				)
			})
			var score = 0
			var fifty = 0
			var sixty = 0
			var seventy = 0
			for (var i = 0; i < filteredData.length; i++) {
				console.log(filteredData[i].weight)
				score += filteredData[i].weight
				if (filteredData[i].Ranking < 60) {
					fifty += filteredData[i].weight * 3
				} else if (60 < filteredData[i].Ranking < 70) {
					sixty += filteredData[i].weight
				} else if (70 < filteredData[i].Ranking < 80) {
					seventy += filteredData[i].weight
				}
			}
			//kormangala
			//marathalli
			//rajajinagar
			console.log(filteredData)
			//Outputs: [ { id: '1', user: 'foo', pass: 'bar' } ]
			//console.log(err, results)
			res.send({ results, filteredData, ...s, score, fifty, sixty, seventy })
		})
		// script finishe
	})
})
module.exports = router
