const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchId,
  abortLaunchById,
} = require("../../models/launch.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      status: 400,
      message: {
        error: "Invalid launch date",
      },
    });
  }

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existsLaunchId(launchId)) {
    return res.status(404).json({
      status: 404,
      message: "Launch not found!",
    });
  }
  const aborted = abortLaunchById(launchId);
  res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
