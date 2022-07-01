const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendfile(__dirname+"/index.html");

app.post("/",function(req,res){
  console.log(req.body.cityName);
  console.log("Post successfully.");
  const query =req.body.cityName;
  const apiKey = "8ae12c46417107721a27f9cb2dd9330a";
  const unit ="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      // res.send(weatherData);
      const temp1=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      // const minSpeed=weatherData.wind.speed;
      // console.log(minSpeed);
      // console.log(weatherDescription);
      console.log(temp1);
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+weatherDescription+"<p>");
      res.write("<h1>The temperature in "+query+" is "+temp1+" degrees Celcius.</h1>")
      res.write("<img src="+imageURL+">");

    res.send();
    })
  })
})

})

app.listen(3000, function() {
        console.log("Server is running on port 3000");
      })
