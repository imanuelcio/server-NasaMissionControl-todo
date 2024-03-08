const request = require("supertest");
const app = require("../../app");

describe("Test GET /Launches", () => {
  test("it should give 200 response", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toBe(200);
  });
});
