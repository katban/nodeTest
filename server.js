// zalacznie paczki ktorej potrzebuje
var express = require('express');

//tworze aplikacje z expressem
var app = express();

//port ktory bedzie uzywac aplikacje
var port = 3000;

// w ekspersie zawarty jest router - odpowiada za endpointy
var router = express.Router();

//pierwszy end-point
router.get('/', function (reg, res) {
	res.json({
		'message': 'THIS IS MY FIRST ENDPOINT very OK'
	});
});

//drugi endpiont
router.get('kwiatki', function(reg, res) {
	res.json({
		'name': 'Bratek'
	});
});

// router trzeba zarejestrowac w aplikacji
app.use('/api', router);

// wystawienie portu aplikacji do  obslugi endpiontu - nasluchiwanie na porcie
app.listen(port);

console.log('App initialized');
