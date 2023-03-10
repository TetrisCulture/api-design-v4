import app from "../server";
import supertest from "supertest";

describe("GET /", function () {
  it("should send back some data", async () => {
    const res = await supertest(app)
     .get('/')
    expect(res.body.message).toBe('hello');
  });
});