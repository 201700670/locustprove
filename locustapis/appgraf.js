const express= require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8070;
const app= express();
app.use(cors(corsOptions));
var corsOptions = {
    origin: "http://0.0.0.0:8070"
}
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.listen(PORT, ()=> console.log(`Server running on port ${PORT} `));
app.get('/',  function(req, res){
    res.send("PARROQUIA WELCOME TO APP!");
});

app.post('/',  function(req, res){
    res.send("PARROQUIA WELCOME TO APP!");
});



app.post('/metrics',  function(req, res){
    var {time}  = req.body;
    console.log(time)
    app.get('/metrics',  function(req, res){        
            res.send(time);  
    });
   res.send("Ingreso Finalizado");
    
   //console.log(JSON.stringify(respuesta));
   
});
