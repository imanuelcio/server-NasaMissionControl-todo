const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchId,
  abortLaunchById,
} = require("../../models/launch.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existLaunch = await existsLaunchId(launchId);

  if (!existLaunch) {
    return res.status(404).json({
      status: 404,
      message: "Launch not found!",
    });
  }
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      status: 400,
      message: "Launch not aborted!",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Launch aborted!",
  });
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
