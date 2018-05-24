const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const compression = require('compression')
const areaRouter = require('./routers/areaRouter')
//const companyRouter = require('./routers/companyRouter')
const PORT = process.env.PORT || 4000

var app = express()

app.use(compression())
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
)
app.use('/api/area/', areaRouter)
app.use(
	'/',
	express
		.Router()
		.use(express.static('dist'))
		.use('*', (req, res) => {
			res.sendFile(path.join(__dirname, './dist', 'index.html'))
		})
)

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
