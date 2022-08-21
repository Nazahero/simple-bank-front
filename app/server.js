const express = require("express");
const path = require("path");
const database = require("../db/database");
const key = process.env.KEY;
const authrouter = require("../router/auth/router");
const pagerouter = require("../router/page/router");

const server = express();
const jsonParser = express.json();

server.set('view engine', 'ejs');

const PORT = 8080;
const createpath = (page) => path.resolve(__dirname, `../views/${page}.ejs`);


server.use(express.static('frontend'));

server.use('/authentication/', authrouter);
server.use('/', pagerouter);

//--------------ERROR_PAGE---------------//


server.use((req,res) => {
    const title = 'Error page';
    res
        .status(404)
        .render(createpath('error'), { title });
});

server.listen(PORT, () => {
    console.log(`Server successufuly have run on port: ${PORT}.`);
});





