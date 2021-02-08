require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const authorize = require("./utils/authorization-middleware");
const config = require("./config/config");
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

const port = process.env.PORT || 5002;

const app = express();
app.set("view engine", "jade")
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.post("/token", (req, res) => {
    const { username, password } = req.body;
    const payload = {
        name: username,
        password: password
    };
    const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
    res.send({ token: token, expiredIn: config.JWT_EXPIRES_IN });
});

// Swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Validate Request
app.use(authorize());

const routes = require('./routes/index.route');
const logger = require('./utils/logger');
app.use(routes);


//Start http server
const httpServer = http.createServer(app);
httpServer.listen(port);
logger.info(`Server listening at port ${port}`);

module.exports = { app };