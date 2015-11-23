/**
 * Created by katban on 23.11.15.
 */

var Place = require('../models/place.js');

exports.getPlaces = function (reg, res) {
    Place.find(function(err, places){
        if (err) {
            res.send(err);
        }
        res.json(places);
    });
};


// sciezka do posta
exports.postPlaces = function (req, res) {
    // nowa instancja danego obiektu
    var place = new Place();

    place.name = req.body.name;
    place.city = req.body.city;
    place.buildingName = req.body.buildingName;
    place.street = req.body.street;
    place.buildingNumber = req.body.buildingNumber;
    place.phone = req.body.phone;

    //zapis do bazy
    place.save(function(err) {
        if (err) {
            // jesli jest error to ma wysłać go do uzytkownika
            res.send(err);
        }
        res.json({message: 'Place added to database', data: place});
    });
};



exports.getPlace = function(req, res) {
    Place.findById(req.params.place_id, function(err, place) {
        if(err) {
            res.send(err);
        }
        res.json(place);
    });
};


//put
exports.putPlace = function(req, res) {
    Place.findById(req.params.place_id, function(err, place) {
        if(err) {
            res.send(err);
        }

        if(req.body.name) {
            place.name = req.body.name;
        }
        if(req.body.city) {
            place.city = req.body.city;
        }
        if(req.body.buildingName) {
            place.buildingName = req.body.buildingName;
        }
        if(req.body.street) {
            place.street = req.body.street;
        }
        if(req.body.buildingNumber) {
            place.buildingNumber = req.body.buildingNumber;
        }
        if(req.body.phone) {
            place.phone = req.body.phone;
        }


        place.save(function (err) {
            if(err) {
                res.send(err);
            }
            res.json(place);
        })

    })
};

exports.deletePlace = function(req,res){
    Place.findByIdRemove(req.params.plac_id, function(err) {
        if(err) {
            res.send(err);
        }
    });
};

exports.ratePlace = function(req, res) {
    Place.findById(req.params.place_id, function(err, place) {
        if(err) {
            res.send(err);
        }

        if(place.score.rate == 'NaN' || place.score.count == 'NaN') {
            place.score.rate = 0;
            place.score.count = 0;
        }

        if(place.score) { // czy cos jest

            if(+req.body.rate < 1 || +req.body.rate > 5) {
                res.send({message: 'Mozesz ocenic tylko w stali 1-5'});
            }

            var tempRate = place.score.rate * place.score.count + +req.body.rate;
            place.score.count++;
            place.score.rate = tempRate / place.score.count;

        }
        else {
            place.score = {};
            place.score.rate = +req.body.rate; // plusik zamienia mi stringa na number
            place.score.count = 1;
        }

        place.score.rate = place.score.rate.toString();
        place.score.count = place.score.count.toString();

        place.save(function (err) {
            if(err) {
                res.send(err);
            }
            res.json(place);
        });

    });
};