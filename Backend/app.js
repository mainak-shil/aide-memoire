const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notesRouterV1 = require("./routes/v1/notes-route");
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  //! CORS handling
  //! idea: add some headers in response; later when we sent back specific routes
  //! does have these headers attached
  res.setHeader("Access-Control-Allow-Origin", "*"); //! allows which domain should allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// app.use("/api/notes", notesRouter);
server.use("/api/v1/notes", notesRouterV1);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || `An unknown error occurred` });
});

mongoose
  .connect(
    `mongodb+srv://mainak:Nc5xNGU4GG5N4Hy7@cluster0.oixkfgt.mongodb.net/notes-app?retryWrites=true&w=majority`
  )
  .then(() => {
    //! if conn success
    app.listen(5001);
  })
  .catch((err) => console.log(err));
