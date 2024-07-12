const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();
const port = 5000;

app.use("/api/places", placesRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  console.log(`App is running on port ${port}`);
  console.log(`App is running on port ${port}`);
});
