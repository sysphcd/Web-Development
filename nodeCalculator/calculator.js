const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  // res.send("Hello World");
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);
    var results= num1 + num2;
    res.send("The result is : " + results);
});

//BMI calculator
app.get("/bmicalculator", function(req,res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});
app.post("/bmicalculator", function(req,res){
  var theweight = parseFloat(req.body.weight);
  var theheight = parseFloat(req.body.height);
  //Math.pow()
  var bmi_result = theweight / (theheight * theheight);
  res.send("Your BMI result is : " + bmi_result);
});




app.listen(3000, function(){
  console.log("server started at port 3000");
})
