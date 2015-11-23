var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
	name: String,
	city: String,
	buildingName: String,
	street: String,
	buildingNumber: String,
	phone: String,
	score: {
		count: Number,
		rate: Number
	}
});

module.exports = mongoose.model('Place', PlaceSchema);
