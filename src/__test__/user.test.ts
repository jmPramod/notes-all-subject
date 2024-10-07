// import { app } from "../index";
import supertest from "supertest";
import { app } from "../app";

describe("user", () => {
  describe("get user route  ", () => {
    describe("give the user doesnt exit ", () => {});
    it("should give 404", async () => {
      const productID = "123";
      expect(true).toBe(true);
      await supertest(app).get(`/user/${productID}`).expect(404);
    });
  });
});
