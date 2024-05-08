const PORT = process.env.PORT || 8000;
const app = require("./app");
const planetsRouters = require("./routes/planets/planets.router");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

app.get("/getuser", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome to Planets Data!",
  });
});

app.use("/planets", planetsRouters);

const uri = `mongodb+srv://nasa-api:qdHHHv0grQXI5aHo@atlascluster.i6zj6nb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error("mongoose connection error : ", err);
});
async function startDatabase() {
  await mongoose.connect(uri);

  await loadPlanetsData();
}

async function startServer() {
  startDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
startServer();
