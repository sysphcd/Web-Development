
const express = require("express");
const https = require("https"); //native npm module
const bodyParser = require("body-parser");
const app =  express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
  // res.send("Server is up and running"); //show on website page
});

app.post("/", function(req, res){
  // console.log("Post request received");
  // install body-parser : npm i body-parser
  console.log(req.body.lat);
  console.log(req.body.lon);

  const queryLat = req.body.lat; //"55.9411885";
  const queryLon = req.body.lon; //"-3.2753783";
  const appKey = "82ea605b236d9b5e531e787481bbaf4d";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat="+queryLat+"&lon="+queryLon+"&appid="+appKey+"&units="+units;
  https.get(url, function(response){

    // console.log(response.statusCode); // stuatus code: 200

    response.on("data",function(data){
      // console.log(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      // const object = {
      //   name: "Phoebe",
      //   favouriteFood:"Ramen"
      // }
      // JSON.stringify(object);

      const temp = weatherData.main.temp;
      // console.log(temp);
      const desc = weatherData.weather[0].description;
      // console.log(desc);
      const iconName = weatherData.weather[0].icon;
      const cityName = weatherData.name;
      const inconURL = "http://openweathermap.org/img/wn/"+iconName+"@2x.png";
      const inconS ="<img src="+inconURL+">";
      const tempS = "<h1>The temperature in "+cityName+" is : "+ temp + " degree celcius</h1>";
      const descS = "<h1>The weather is currently "+desc+"</h1>";

      res.write(tempS);
      res.write(descS);
      res.write(inconS);
      res.send();
    });
  });


});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
