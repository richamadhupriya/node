var  http  =  require('http');
var  expressexpressexpressexpressexpressexpressexpressexpress  =  require('express');
var  parser  =  require('body-parser');
var  fs  =  require('fs');
varvarvarvarvarvarvarvarvarvarvarvarvarvarvarvarvar cors = require('cors');
var  exp  =  express();
var mongoClient=require("mongodb").MongoClient;

exp.get("/rest/api/load", cors(), (req,  res) => {
    console.log('Load Invoked');
    res.send({ msg: 'GIVE SOME REST TO WORLD' });
});
exp.route('/rest/api/get', cors()).get((req,  res) => {
    console.log('Get Invoked');
    //res.send({ msg: 'WORLD' });
    mongoClient.connect('mongodb://localhost:27017/test', function(err, client) {
  if (err) throw err;
  var dbo = client.db('test');
  var query = { };
  dbo.collection('test').find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    client.close();
  });
});

});
exp.use(parser.json());
exp.route('/rest/api/post',  cors()).post((req,  res)  =>  {
    console.log(req.body);
    fs.appendFileSync('demo.json',  JSON.stringify(req.body));
    res.status(201).send(req.body);
    mongoClient.connect('mongodb://localhost:27017/test',function(err,client){
    var col = client.db('test');
    col.collection('test').insert(req.body,true,function(err,req){
        console.log("1 document inserted");
        client.close();
    });
});
 });
exp.route('/rest/api/get/:name').get((req, res) => {
    console.log()
    res.send("Hello World" + req.params['name']);
});


exp.put('/rest/api/put/:name/:age',(req,res)=>{
    console.log("PUT done");
mongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  var dbo = db.db('test');
  var myquery = {name: req.params.name, age:req.params.age };
  var newvalues = { $set: {name: req.query.name, age:req.query.age } };
  dbo.collection('test').updateOne(myquery, newvalues, function(err, res1) {
    if (err) throw err;
    console.log("1 document updated");
       res.send(res1);
    db.close();
  });
});
});
exp.delete('/rest/api/delete/:name/:age',(req,res)=>{
        console.log(req.params.name)
    console.log(req.params.age)
    mongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) throw err;
  var dbo = db.db('test');
  var myquery = { name: req.params.name, age:req.params.age };
  console.log(myquery)
    dbo.collection('test').deleteOne(myquery, function(err, res2) {
    if (err) throw err;
    console.log("1 document deleted");
    //console.log("Delete done");
       res.send(res2);
    db.close();
  });
});
});

exp.use(cors()).listen(3000, () => console.log("Running..."));



var http = require('http');
var express = require('express');
var exp = express();
var body = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var mobile = require('./jsonDbase.json');

exp.get("/rest/api/load", cors(), (req, res) => {
    console.log("load invoked");
    //res.send({ msg: 'give some rest to world' });
    let rawdata = fs.readFileSync('jsonDbase.json');
    let mobile = JSON.parse(rawdata);
    console.log(mobile);
    res.send(mobile);
});

exp.route("/rest/api/get", cors()).get((req, res) => {
    console.log('get inovked');
    //res.send({ msg: 'world' });
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";

    MongoClient.connect(url, function (err, dataConn) {
        if (err) throw err;
        var database = dataConn.db('test');
        database.collection('demo').findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            res.end();
            dataConn.close();
        });
    });
});

exp.use(body.json());
exp.route('/rest/api/post', cors()).post((req, res) => {
    console.log(req.body);
    fs.appendFileSync('jsonDemo.json', JSON.stringify(req.body));
    res.status(201).send(req.body);
    MongoClient.connect('mongodb://localhost:27017/test',
        function (err, dataConn) {
            if (err) throw err
            var database = dataConn.db('test');
            database.collection('demo').insert(req.body, true, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted")
                console.log(res);
                dataConn.close()
            })
            dataConn.close()
        })
});

exp.route('/rest/api/get/:name').get((req, res) => {
    res.send("Hello World" + req.params['name']);
});

exp.route('/rest/api/put', cors()).put((req, res) => {
console.log(req.body);
fs.appendFileSync('demo.json', JSON.stringify(req.body));
res.status(201).send(req.body);
var url = "mongodb://localhost:27017/test";
MongoClient.connect(url, function (err, dataConn) {
if (err) throw err;
var database = dataConn.db("test");
var myquery = { "mobId":"1003"};
var newvalues = { $set: { "name": "akansha", "age":"15","mobName":"Coolpad",
"mobPrice":7823 } };
database.collection("demo").updateOne(myquery, newvalues, function (err, res) {
if (err) throw err;
console.log("1 document updated");
//res.send(newvalues);
dataConn.close();
});
});
});


exp.use(cors()).listen(3000, () => console.log('running.........'));