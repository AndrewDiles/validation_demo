const express = require("express");
const morgan = require("morgan");
const {
	handleTest,
	handle404
} = require("./handlers");


const PORT = 3003;

const app = express();

// middleware
app.use(morgan("tiny"));
app.use(express.json())

// get endpoints
app.get("/test", handleTest);
app.get("*", handle404);

// post endpoints
app.post("*", handle404);

app.listen(PORT, () => {
  console.log("Howdy! The server is listening on port:", PORT);
});
