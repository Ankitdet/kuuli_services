const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const authorize = require("./utils/authorization-middleware");
const config = require("./config/config");

//build config from params
const port = process.env.PORT || 5002;

//setup app & its routes
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.get("/token", (req, res) => {
    const payload = {
        name: "Jimmy",
        password : "Jimmy"
    };
    const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
    res.send(token);
});

app.use(authorize());

const routes = require('./routes/index.route');
app.use(routes);


//start http server
const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Server listening at port ${port}`);

module.exports = { app };