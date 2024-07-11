import dotenv from "dotenv";
import {register} from "../../src/controllers/auth-controller";

// beforeAll(async () => {
//     dotenv.config();
// });
//
// describe("auth-controller.ts tests", () => {
//     test("Adding a new user", async () => {
//         const success = await register(process.env.AUTH_USERNAME!, process.env.AUTH_PASSWORD!);
//         expect(success).toBeTruthy();
//     });
// });