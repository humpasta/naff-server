import {DB} from "../../src/db/database";
import dotenv from "dotenv";

beforeAll(async () => {
    dotenv.config();
});

describe("database.ts tests", () => {
    test("Getting all subscribers", async () => {
        const subscribers = await DB.all("SELECT email FROM subscribers");
        expect(subscribers.length).toBeGreaterThan(0);
    });

    test("Adding a new subscriber", async () => {
        const subscribersBefore = (await DB.all("SELECT email FROM subscribers")).length;
        const email = "test@test.test";
        await DB.run(`INSERT INTO subscribers VALUES ("${email}")`);
        const subscribersAfter = (await DB.all("SELECT email FROM subscribers")).length;
        expect(subscribersBefore).toBeLessThan(subscribersAfter);
    });

    test("Removing a subscriber", async () => {
        const subscribersBefore = (await DB.all("SELECT email FROM subscribers")).length;
        const email = "test@test.test";
        await DB.run(`DELETE FROM subscribers WHERE email = "${email}"`);
        const subscribersAfter = (await DB.all("SELECT email FROM subscribers")).length;
        expect(subscribersBefore).toBeGreaterThan(subscribersAfter);
    });
});