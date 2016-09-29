var Hospital = require('./models/todo');
/* var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
  if(err) { return console.dir(err); }

  db.collection('hospital', function(err, collection) {});
}); */

var mongoose = require('mongoose'); 

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/hospital', function(req, res) {
        
        var response = {};
		// use mongoose to get all data in the database
        Hospital.find({}, function(err, data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

	// create todo and send back all todos after creation
	app.post('/hosCreate', function(req, res) {

         var db = new Hospital();
         var response = {}
         db.movie = req.body.movie;
		 db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
	});
    
    app.put('/hosUpdate/:id', function(req, res) {
        
        var response = {}
        Hospital.findById(req.params.id, function(err, data) {
                
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    if(req.body.h_id !== undefined) {
                        // case where h_id needs to be updated.
                        data.h_id = req.body.h_id;
                    }
                    if(req.body.name !== undefined) {
                        // case where name needs to be updated
                        data.name = req.body.name;
                    }
                // save the data
                    data.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                        }
                        res.json(response);
                    })
                }
        });
    });

	// delete a todo
	app.delete('/hosDelete/:id', function(req, res) {
		var response = {};
        // find the data
        Hospital.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                Hospital.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};