var sql = require("mssql");

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

function getMenuItems() {
	var conn = new sql.Connection(config);
	conn.connect()
	.then(function() {
		var req = new sql.Request(conn)
		req.query("SELECT * FROM Menu")
		
		.then(function(recordset) {
			console.log(recordset);
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

getMenuItems();