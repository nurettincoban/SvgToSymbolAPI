var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 3000,
    cors        = require('cors'),
    SVGSpriter  = require('svg-sprite'),
    bodyParser  = require('body-parser'),
    svgAPI = require('./routes/api');;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.json({ message: 'Server is working' });
});

app.use('/api',svgAPI);

app.listen(port, ()=>{
    console.log('App is running on port: '+port);
});