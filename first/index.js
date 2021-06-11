const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

let dataw = "";
let datan = "";

https.request(
    {
      hostname: "api.openweathermap.org",
      path: "/data/2.5/weather?q=Almaty&appid=59de0611bf6d3e3a617d0f1e1b14f45f"
    },
    res => {     
      res.on("data", d => {
        dataw += d
      })
	  
      res.on("end", () => {
        dataw = JSON.parse(dataw);
      })
    }
	
).end()

https.request(
    {
      hostname: "newsapi.org",
      path: "/v2/top-headlines?sources=techcrunch&apiKey=7c9d8282bfd047eb8d3ca1fbdb6f133a"
    },
    res => {     
      res.on("data", d => {
        datan += d
      })
	  
      res.on("end", () => {
        datan = JSON.parse(datan);
      })
    }
	
).end()



app.set('view engine','ejs')

app.get('/', function(req, res) {
  res.render('index', {dataw:dataw, datan:datan});
});

app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));





