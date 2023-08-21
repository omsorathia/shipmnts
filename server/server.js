const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


const userLogin = require("./src/routes/userLogin");

const QuestionManagement = require("./src/routes/QuestionManagement")

app.use("/", userLogin);

app.use("/", QuestionManagement)

app.listen(5000, () => {
  console.log("Server in listening on PORT 5000");
});
