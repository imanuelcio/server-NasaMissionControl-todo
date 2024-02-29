const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");
const planetsRouters = require("./routes/planets/planets.router");
const { loadPlanetsData } = require("./models/planets.model");
const server = http.createServer(app);

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome to Planets Data!",
  });
});

app.use("/planets", planetsRouters);

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
startServer();
