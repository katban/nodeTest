// zalacznie paczki ktorej potrzebuje
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var Place = require('./models/place');  //bez .js
var PlaceController = require('./controllers/placeController');

//polaczenie z baza
mongoose.connect('mongodb://localhost:27017/nodetest');

//tworze aplikacje z expressem
var app = express();

// dodatnie corsa
app.use(cors());

// dodanie parsera
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//port ktory bedzie uzywac aplikacje
var port = 3000;

// w ekspersie zawarty jest router - odpowiada za endpointy
var router = express.Router();

router.route('/places')
	.post(PlaceController.postPlaces)
	.get(PlaceController.getPlaces);


router.route('/places/:place_id')
	.get(PlaceController.getPlace)
	.put(PlaceController.putPlace)
	.delete(PlaceController.deletePlace);

router.route('/place/:place_id/rate')
	.post(PlaceController.ratePlace);


//pierwszy end-point
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
