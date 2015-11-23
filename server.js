// zalacznie paczki ktorej potrzebuje
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Place = require('./models/place');  //bez .js

//polaczenie z baza
mongoose.connect('mongodb://localhost:27017/nodetest');

//tworze aplikacje z expressem
var app = express();

// dodanie parsera
app.use(bodyParser.urlencoded({extended: true}));

//port ktory bedzie uzywac aplikacje
var port = 3000;

// w ekspersie zawarty jest router - odpowiada za endpointy
var router = express.Router();

//pierwszy end-point
router.get('/', function (reg, res) {
	Place.find(function(err, places){
		if (err) {
			res.send(err);
		}
		res.json(places);
	});
});


// sciezka do posta
router.post('/', function (req, res) {
	// nowa instancja danego obiektu
	var place = new Place();

	place.name = req.body.name;
	place.city = req.body.city;
	place.buildingName = req.body.buildingName;
	place.street = req.body.street;
	place.buildingNumber = req.body.buildingNymber;
	place.phone = req.body.phone;

	//zapis do bazy
	place.save(function(err) {
		if (err) {
			// jesli jest error to ma wysłać go do uzytkownika
			res.send(err);
		}
		res.json({message: 'Place added to database', data: place});
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
