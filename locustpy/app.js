const express= require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8056;
const app= express();
app.use(cors(corsOptions));
var corsOptions = {
    origin: "http://0.0.0.0:8050"
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
    if(time===undefined){
        strfinal = `# HELP go_py_total_tiempo cantidad total.
   # TYPE go_py_total_tiempo gauge
   go_py_total_tiempo ` + 0
   res.send(strfinal);
    }else{
        strfinal = `# HELP go_py_total_tiempo cantidad total.
   # TYPE go_py_total_tiempo gauge
   go_py_total_tiempo ` + time
   app.get('/metrics',  function(req, res){
        res.send(strfinal);
    });
   res.send(strfinal);
    }
   //console.log(JSON.stringify(respuesta));
   
});
