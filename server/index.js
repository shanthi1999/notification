const express = require("express");

const app = express();

const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const eventCall = require("./event-call");

const PORT = 7000 || process.env.PORT;

app.use(cors());
app.use(express.json());

const DB_URL =
  "mongodb+srv://chat:chat@cluster0.zupza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connectDB = mongoose.connection;

connectDB.on("open", () => {
  console.log("DB connected....");
});

var cron = require('node-cron');

cron.schedule('* * * * *',async () => {
  await eventCall()
  console.log('running every minute 1, 2, 4 and 5');
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Port connected...${PORT}`);
});
