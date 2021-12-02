const express = require("express");
const app = express();
const port = process.env.PORT || 4182;

app.get("/results", (req, res) => {
  res.sendFile(__dirname + "/results.csv");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
