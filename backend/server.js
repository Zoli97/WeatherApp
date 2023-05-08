const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 8900;

require("dotenv").config();

const app = express();

//rate limiting. windowsMs -> time that i want, ex i want to do one hundred within 10 min max. max-> how many times in 10 minutes can they make their req.
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 120,
});

//adding middleware
app.use(limit);
app.set("trust proxy", 1);

//My Routes
app.use("/api/weather", require("./routes"));

app.use(express.static("dist"));
app.use(cors());

app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`);
});
