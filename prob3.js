var express = require('express');
var exp = express();
var parser = require('body-parser');
var mongoClient = require('mongodb').MongoClient
var emp =[];
var fs = require('fs');

exp.use(parser.json());
//DISPLAY ALL THE EMPLOYEES
exp.get('/get', function (req, res) {
    fs.readFile("employee.json", function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        return res.end("404 Not Found");
      }  
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(data);
      console.log(data.toString());
      return res.end();
    });
  });

//FIND EMPLOYEE DETAILS BY STATE
  exp.get('/get/:state',(req, res)=>{
    empDetails=[];
   
    var raw = fs.readFileSync('employee.json')
    var data = JSON.parse(raw);
    for(var d of data){

        if (d.empAddress.state == req.params['state'] ){
            empDetails.push(d); 

        }
    }

    res.status(201).send(empDetails);
    console.log(empDetails)
  
});

 //ADD NEW EMPLOYEE
exp.post('/post',function(req,res){
   // console.log(req.body);
    emp.push(req.body);
    fs.appendFile("employee.json",JSON.stringify(req.body));
    res.status(200).send(req.body);

});

//UPDATING CITY OF AN EMPLOYEE

exp.put('/update', function(req, res){
    
    emp = emp.map(
        (employee)=> {
        if(employee.empId == req.body.empId) {
            return req.body;
        }
        return employee
    })
    
    fs.writeFileSync("employee.json", JSON.stringify(employees))
    res.send(req.body)
});

  exp.listen(3000, () => console.log("RUNNING"));