import dotenv from "dotenv";
import {addSubscriber, deleteSubscriber, getSubscribers} from "../../src/controllers/subscriber-controller";

beforeAll(async () => {
    dotenv.config();
});

describe("subscriber-controller.ts tests", () => {
    test("Getting all subscribers", async () => {
        const users = await getSubscribers();
        expect(users.length).toBeGreaterThan(0);
    });

    test("Adding a new subscriber", async () => {
        const subscribersBefore = (await getSubscribers()).length;
        const email = "test@test.test";
        await addSubscriber(email);
        const subscribersAfter = (await getSubscribers()).length;
        expect(subscribersBefore).toBeLessThan(subscribersAfter);
    });

    test("Removing a subscriber", async () => {
        const subscribersBefore = (await getSubscribers()).length;
        const email = "test@test.test";
        await deleteSubscriber(email);
        const subscribersAfter = (await getSubscribers()).length;
        expect(subscribersBefore).toBeGreaterThan(subscribersAfter);
    });
});