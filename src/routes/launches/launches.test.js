const request = require("supertest");
const app = require("../../app");

describe("Test GET /Launches", () => {
  test("it should give 200 response", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

const completeLaunchData = {
  mission: "USS Enterprise",
  rocket: "NCC 1701-D",
  target: "Kepler-186 f",
  launchDate: "January 4, 2028",
};
const launchDataWithoutDate = {
  mission: "USS Enterprise",
  rocket: "NCC 1701-D",
  target: "Kepler-186 f",
};
describe("Test POST /Launches", () => {
  test("it should give 201 response", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responsedate = new Date(response.body.launchDate).valueOf();
    expect(responsedate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
});

// test("It should catch missing required properties", async () => {
//   const response = await request(app)
//     .post("/launches")
//     .send({
//       mission: "USS Enterprise",
//       rocket: "NCC 1701-D",
//       target: "Kepler-186 f",
//     })
//     .expect("Content-Type", /json/)
//     .expect(400);

//   expect(response.body).toStrictEqual({
//     error: "Missing required launch property",
//   });
// });
