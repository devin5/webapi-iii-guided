const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use("/api/hubs", hubsRouter);

// function dateLogger(req, res, next) {
//   console.log(Date.now.toISOString());
//   next();
// }
function Logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}
// function gateKeeper(req, res, next) {
//   // data can come in the body, url parameters, query string, headers
//   // new way of reading data sent by the client
//   const password = req.headers.password || '';

// global
server.use(helmet()); //third party
server.use(express.json()); // built in
// server.use(dateLogger); // custom
server.use(Logger); // custom

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
