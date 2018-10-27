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

function handleGET(req, res) {
    mysqlPool.query("SELECT * FROM general", (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            res.send(JSON.stringify(results))
        }
    })
}

function handlePOST(req, res) {
    let body = JSON.parse(req.body)

    let queryString = "SELECT * FROM general WHERE "

    for (let i=0; i<body.length; i++) {
        if (i == body.length - 1) {
            queryString += "'" + body[i].field + "' = '" + body[i].value + "'"
        } else {
            queryString += "'" + body[i].field + "' = '" + body[i].value + "' AND "
        }
    }

  	res.send(queryString)

    //mysqlPool.query(queryString, (err, results) => {
       // if (err) {
         //   res.status(500).send(err)
       // } else {
       //     res.send(results)
     //   }
   // })
}

exports.getCompanies = (req, res) => {
  	if (!mysqlPool) {
    	mysqlPool = mysql.createPool(mysqlConfig)
  	}

    switch(req.method) {
        case "GET": handleGET(req, res); break;
        case "POST": handlePOST(req, res); break;
    }
}
