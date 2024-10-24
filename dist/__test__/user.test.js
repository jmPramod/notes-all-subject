"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe("user", () => {
    describe("get user route  ", () => {
        describe("give the user doesnt exit ", () => { });
        it("should give 404", async () => {
            const productID = "123";
            expect(true).toBe(true);
            await (0, supertest_1.default)(app_1.app).get(`/user/${productID}`).expect(404);
        });
    });
});
