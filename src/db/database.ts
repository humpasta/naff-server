import {Database} from 'sqlite3';
import {logger} from "../server";

export class DB {

    private static database: Database;

    private static getDatabase(): Database {
        const dbPath = process.env.DATABASE_PATH;
        if (!DB.database) {
            DB.database = new Database(dbPath!, err => {
                if (err) {
                    logger.error('Error opening database', err.message);
                } else {
                    logger.info(`Connected to the SQLite database at ${dbPath}`);
                }
            });
        }
        return DB.database;
    }

    static all(query: string): Promise<any[]> {
        const db = DB.getDatabase();
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static get(query: string): Promise<any> {
        const db = DB.getDatabase();
        return new Promise((resolve, reject) => {
            db.get(query, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static run(query: string): Promise<void> {
        const db = DB.getDatabase();
        return new Promise((resolve, reject) => {
            db.run(query, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}