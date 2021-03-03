// 206710310000185
require('dotenv').config();
import 'babel-polyfill';
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./auth_config.json");
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('../swagger.json');

const port = process.env.PORT || 5002;

const app = express();
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(helmet());
app.set("view engine", "pug")

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

if (
    !authConfig.domain ||
    !authConfig.audience ||
    authConfig.audience === "YOUR_API_IDENTIFIER"
) {
    console.log(
        "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
    );
    process.exit();
}

/* app.post("/token", (req, res) => {
    const { username, password } = req.body;
    const payload = {
        name: username,
        password: password
    };
    const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
    res.send({ token: token, expiredIn: config.JWT_EXPIRES_IN });
}); */

// Swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Validate Request
// app.use(authorize());
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"],
});
app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your access token was successfully validated!",
    });
});

const routes = require('./routes/index.route');
const logger = require('./logger/logger');
app.use(routes);


//Start http server
const httpServer = http.createServer(app);
httpServer.listen(port);
logger.info(`Server listening at port ${port}`);

module.exports = { app };