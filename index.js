const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db')
const cors = require("cors");
const routes = require('./routes/routes');
const port = process.env.PORT || 5000;
const path = require('path');

db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/employees', routes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname+'/angular_src/dist/employee-mngmt')))
    
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname+'/angular_src/dist/employee-mngmt/index.html'))
    })
}

app.use((req, res, next) => {
    const error = new Error("Nothing Found!! Check your app again..");
    error.status = 404;
    next(error);
  });


app.listen(port,() => {
    console.log(`Server up and running at port ${port}...`);
})