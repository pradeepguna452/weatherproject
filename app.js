const { query } = require("express");
const express = require ("express");                            // Which is used to get the express framework
const https = require ("https");
const bodyParser=require("body-parser");

const app =express();                                            // which is used to initiate the express framework
app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req,res)
{
 res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){                                    // This is used to view the home page of our project 
    const query = req.body.CityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=cf8d703f7ae870f60cbc0c63be7ce974";
    console.log(url);
    https.get (url , function(response){
        console.log(response.statusCode);    // which will printout the status ex..404,200 etx..
    
        response.on("data", function(data){
            console.log(res.data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
           
            //   Tis is oneway  res.send(`<h1>The temperature in india is ${temp} degree </h1> <br> <h1>The weather is currently ${weatherDescription}`);
           
            res.write(`<p>The weather is currently ${weatherDescription}</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} in degree celsius</h1>`); 
            res.write(`<img src="${imageURL}" alt="images">`);
            res.send();

    })
    })
    })

app.listen(3001, function(){                                       // This is used to create a server 
    console.log("This server is in active stage....");
})