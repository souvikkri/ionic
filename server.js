var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist',['contactlist,users']);
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/www"));
app.use(bodyParser.json());
app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
// Pass to next layer of middleware
next();
});
var url = 'mongodb://souvika:souvik@ds135700.mlab.com:35700/demo';
//'mongodb://demo123:raj970123@ds131480.mlab.com:31480/demo';

	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Connected to Database");

	app.get('/contactlists',function(req,res){
	console.log("i get GET request")
	db.collection('users').find().toArray(function(err,docs){console.log(docs);
	//assert.equal(1, docs);
	res.json(docs);
	});
	});
	
	app.post('/contactlists',function(req,res){
	console.log(req.body)
	db.collection('users').insertOne(req.body,function(err,docs){
	//console.log(docs);
	res.json(docs);
	});
	});

	app.delete('/contactlists/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.collection('users').deleteOne({_id: ObjectID(id)},function(err,docs){
	res.json(docs);
	})
	});
	
	app.get('/contactlists/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.collection('users').findOne({_id: ObjectID(id)},function(err,docs){
	console.log(docs);
	res.send(docs);
	});
	});
	
	app.put('/contactlists/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	console.log(id);
	db.collection('users').updateOne(
	{_id:ObjectID(id)},
	{$set: {name: req.body.name,email:req.body.email,number:req.body.number}},
	{upsert: true
	},function(err,docs){
	console.log(docs);
	res.json(docs);
	});
	});
	});
	
var port = process.env.PORT || 8000;
app.listen(port);
console.log("App listening on Port ",+port);
