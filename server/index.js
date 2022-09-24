global.CONFIG = require('./config/config')
const express = require('express');
const app = express();
const port = 3600;
const http = require('http');
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // handle json data
  .use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE"
    );
    response.header(
      "Access-control-Allow-Headers",
      "Acess-Control-Allow-Headers,Origin,X-Requested-With,Content-type,Accept,Authorization,refreshToken");
    next();
  })
  .use("/api", require('./Routes/index'))

app.use(express({
    type: ['application/json', 'text/plain']
  }))
app.listen(port, function () {
  console.info(`server is running at http://localhost:${port}`);
})

module.exports = app;
http.createServer(app)

