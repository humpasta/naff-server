import {DB} from "../db/database";

export const getSubscribers = async (): Promise<string[]> => {
    try {
        const result = await DB.all("SELECT email FROM subscribers");
        return result.map(user => user.email);
    } catch (e) {
        throw Error("Error getting all subscribers: " + e);
    }
};

export const addSubscriber = async (email: string) => {
    try {
        const result = await DB.get(`SELECT email FROM subscribers WHERE email = "${email}"`);
        if (!result) {
            await DB.run(`INSERT INTO subscribers VALUES ("${email}")`);
        }
    } catch (e) {
        throw Error("Error adding subscriber: " + e);
    }
}

export const deleteSubscriber = async (email: string) => {
    try {
        await DB.run(`DELETE FROM subscribers WHERE email = "${email}"`);
    } catch (e) {
        throw Error("Error deleting subscriber: " + e);
    }
}