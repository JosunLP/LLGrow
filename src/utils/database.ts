import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function openDb(): Promise<Database> {
  return open({
    filename: './data/knowledge.db', // Ensure this path is correct and the directory exists
    driver: sqlite3.Database,
  });
}

export async function initializeDb(db: Database): Promise<void> {
  await db.exec(`
        CREATE TABLE IF NOT EXISTS knowledge (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS optimization_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            record TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}
