const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouters = express.Router();

planetsRouters.get("/", httpGetAllPlanets);
module.exports = planetsRouters;
