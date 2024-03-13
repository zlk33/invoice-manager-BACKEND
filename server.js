const express = require("express");
const app = express();
const { port } = require("./config");
const apiRouter = require("./routes/Api");
const bodyParser = require("body-parser");
const { writeLog } = require("./logger");
console.log("Starting server...");
writeLog("Starting server...");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
require("./database/connection");
app.use("/", apiRouter);

app.listen(port, function () {
  console.log("\x1b[32mServer working at \x1b[0m http://localhost:" + port);
});
