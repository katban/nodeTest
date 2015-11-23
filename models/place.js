var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
	name: String,
	city: String,
	buildingName: String,
	street: String,
	buildingNumber: String,
	phone: String,
	score: {
		count: String,
		rate: String
	}
});

module.exports = mongoose.model('Place', PlaceSchema);
