var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'ipobfcpvprjpmdo9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	port: 3306,
	user: 'cpoaezjxu1j73iv7',
	password: 'hdynapdcgxwwmeg8',
	database: 'k5gfy0r2ob4ezc7j'
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;

