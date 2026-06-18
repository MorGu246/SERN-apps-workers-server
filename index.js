//npm i express mysql2 body-parser
//npm i express mysql2 body-parser cors
process.env.TZ = "Asia/Jerusalem";

const express = require('express');

const port = 6128;
const app = express();
app.use(express.json());

// const cors = require('cors');
// // app.use(cors());
// app.use(cors({
//     origin: "http://localhost:4388", // Specify exact origin, not wildcard *
//     credentials: true // Allow credentials
// }));

const cors = require('cors');

app.use(cors({
    // מאשרים גם את הפורט הישן וגם את הפורט החדש של Vite
    origin: ["http://localhost:4388", "http://localhost:5173"], 
    credentials: true // מאפשר העברת עוגיות ו-Headers מאובטחים
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const path = require('path');

//--- mysql db-----
let db_M = require('./database');
global.db_pool = db_M.pool;

// global.GenObj_Mid = require("./Middleware/GenObj_Mid");

const main_api_R = require('./Routers/main_api_R');
app.use('/api', main_api_R);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});