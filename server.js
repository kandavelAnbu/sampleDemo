// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express				
var mongodb = require('mongodb');                       // mongoose for mongodb
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mydb';
var hospitalCollection = "hospital";
var ObjectId = require('mongodb').ObjectID;
var port  	 = process.env.PORT || 8090; 				// set the port
var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for hospitals
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
	/* require('./app/routes.js')(app); */

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

        app.get("/hospitals", function(req, res) {
            db.collection(hospitalCollection).find({}).toArray(function(err, data) {
              //console.log(hospitalCollection);
                if (err) {
                  handleError(res, err.message, "Failed to get contacts.");
                } else {
                  res.status(200).json(data);
                }
            });
        });
        
        app.post('/hosCreate', function(req, res) {

                
             var response = {}
             console.log(req.body);
             var document = {h_id: req.body.h_id, name: req.body.name};
                          
             db.collection(hospitalCollection).insert(document, function(err){
             // it will add new data in collection.
                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                } else {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
        });
        
        app.put('/hosUpdate', function(req, res) {

                
             var response = {}
             console.log(req.body);
             var h_id = req.body.h_id;
             var name = req.body.name;
                          
             db.collection(hospitalCollection).update({"h_id": h_id}, {$set: {"name": name}}, function(err){
            // it will updated new data in collection.
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data updated"};
                }
                res.json(response);
            });
        });
        
        app.delete('/hosDelete', function(req, res) {


             var response = {}
             console.log(req.header);
             console.log('hi');
             var jsonString = {"h_id": req.body.h_id};
             db.collection(hospitalCollection).remove(jsonString, function(err){
            // it will delete in collection.
                if(err) {
                    response = {"error" : true,"message" : "Error deleting data"};
                } else {
                    response = {"error" : false,"message" : "Data deleted"};
                }
                res.json(response);
            });
        });
    }
});