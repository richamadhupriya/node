const express = require('express')
const fs = require('fs')
const parser = require('body-parser')

const app = express()

let employees = []

app.use(parser.json())
app.get('/', (req, res)=>{
    //console.log(req.query.state)
    fs.readFile("employees.json", (err, data)=> {
        employees = JSON.parse(data.toString())
        if(req.query.state) {
            employees = employees.filter((emp) => 
                emp.empAddress.state == req.query.state
            )
        }
        //console.log(employees)
        res.send(employees)
    })
})

app.post('/', (req, res)=>{
    console.log("In post")
    console.log(req.body)
    employees.push(req.body)
    console.log(employees)
    fs.writeFileSync("employees.json", JSON.stringify(employees))
    res.send(req.body)
})

app.put('/', (req, res)=>{
    console.log('Put')
    //console.log(req.body)
    employees = employees.map((emp)=> {
        if(emp.empId == req.body.empId) {
            return req.body
        }
        return emp
    })
    console.log(employees)
    fs.writeFileSync("employees.json", JSON.stringify(employees))
    res.send(req.body)
})

app.listen(8080, ()=> console.log("Listening on port 8080"))
