const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { auth } = require('express-openid-connect');
const config = require('./config'); // importing configuration object from another file

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Middleware
app
  .use(bodyParser.json())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(auth(config));

// Routes
app
  .use('/', require('./routes'))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});