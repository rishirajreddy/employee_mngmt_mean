const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db')
const cors = require("cors");
const routes = require('./routes/routes');
const port = process.env.PORT || 5000;
const path = require('path');

db();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/employees', routes);

app.use(express.static(path.join(__dirname+'/public')))
    
app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname+'/public/index.html'))
    })

app.use((req, res, next) => {
    const error = new Error("Nothing Found!! Check your app again..");
    error.status = 404;
    next(error);
  });


app.listen(port,() => {
    console.log(`Server up and running at port ${port}...`);
})