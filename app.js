var express = require("express");
var app = express();
var cors = require("cors");
require("dotenv").config();

var port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.post("/url/post", handlePostUrl);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});