const mysql = require('mysql')

const connectionName = process.env.INSTANCE_CONNECTION_NAME || 'my-project-1510348200658:europe-west1:coco-db'
const dbUser = process.env.SQL_USER || 'root'
const dbPassword = process.env.SQL_PASSWORD || 'coco999'
const dbName = process.env.SQL_NAME || 'coco'

const mysqlConfig = {
  	connectionLimit: 1,
  	user: dbUser,
  	password: dbPassword,
  	database: dbName
}

if (process.env.NODE_ENV === 'production') {
  	mysqlConfig.socketPath = `/cloudsql/${connectionName}`
}

let mysqlPool

exports.getCompanies = (req, res) => {
  	if (!mysqlPool) {
    	mysqlPool = mysql.createPool(mysqlConfig)
  	}

    res.set('Access-Control-Allow-Origin', '*')

    if (req.method == "OPTIONS") {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'POST')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.set('Access-Control-Max-Age', '3600')
        res.status(204).send('')
    } else if (req.method == "POST") {
        let body = req.body

        let queryString = "SELECT * FROM test WHERE "

        for (let i=0; i<body.length; i++) {
            if (i == body.length - 1) {
                queryString += body[i].field + " = '" + body[i].value + "';"
            } else {
                queryString += body[i].field + " = '" + body[i].value + "' AND "
            }
        }

        mysqlPool.query(testQueryString, (err, results) => {
            if (err) {
                res.set('Access-Control-Allow-Origin', '*')
                res.status(500).send(err)
            } else {
                res.set('Access-Control-Allow-Origin', '*')
                res.send(results)
            }
        }
    }
}
