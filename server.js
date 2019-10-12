var sql = require("mssql");
const express = require('express');
const app = express();
const router = express.Router();

var user = 'Daniel';
var password = 'Sweden1987';
var server = 'mytestmenu.database.windows.net';
var database = 'menu';
var port = 1433;

var config = {
	user: user,
	password: password,
	server: server,
	database: database,
	port: port,
	options: {
		encrypt: true
	}
};


app.get('/all', function (req, res) {
	var q = "SELECT * FROM Menu";
  	getMenuItems(req, res, q);
})

app.get('/rating/:ratingAbove', function (req, res) {
	var q = "SELECT * FROM Menu WHERE rating >" + req.params.ratingAbove;
	console.log(req.params.ratingAbove)
	getMenuItems(req, res, q);
})

function getMenuItems(req, res, query) {
 var conn = new sql.ConnectionPool(config);
	conn.connect()
	.then(function() {
		var req = new sql.Request(conn)
		req.query(query)
		
		.then(function(recordset) {
			console.log(recordset);
			res.send(recordset.recordsets[0]);
			conn.close()
		})

		.catch(function(err) {
			console.log(err);
			conn.close();
		})

	})

	.catch(function(err) {
		console.log(err)
		conn.close();
	});

}

app.listen(3000, function() {
  console.log('listening on http://localhost:8000');
});


