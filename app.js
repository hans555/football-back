var express = require("express");
var app = express();
var cors = require("cors");
const { handlePostMatch, handleResetMatch } = require("./footballHandler");
require("dotenv").config();


var port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.post("/football/post-match", handlePostMatch);
app.post("/football/reset-match", handleResetMatch);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});