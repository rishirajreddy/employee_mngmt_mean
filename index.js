const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/db");
const cors = require("cors");
const routes = require('./routes/routes');
const port = process.env.PORT || 3000;

db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/employees', routes);


app.listen(port,() => {
    console.log(`Server up and running at port ${port}...`);
})