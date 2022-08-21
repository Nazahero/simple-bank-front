const express = require('express');

const app = express();


app.use((req, res) => {
    console.log(req.connection.remoteAddress);
    res.send("ok");
})

app.listen(5000, () => {
        console.log("Server successufuly has created");
})