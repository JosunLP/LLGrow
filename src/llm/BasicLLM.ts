import { LLM } from './LLM';
import { crawlAndExplore } from '../utils/crawler';
import { openDb, initializeDb } from '../utils/database';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Database } from 'sqlite'; // or the correct module where Database is defined

export class BasicLLM implements LLM {
  private knowledgeBase: string[] = [];
  protected dataPath: string = path.resolve(__dirname, '../../data');
  private db: Database | null = null;

  constructor() {
    this.loadKnowledge();
  }

  async initDb(): Promise<void> {
    this.db = await openDb();
    await initializeDb(this.db);
  }

  async train(data: string): Promise<void> {
    if (this.db) {
      await this.db.run('INSERT INTO knowledge (data) VALUES (?)', data);
    }
    this.knowledgeBase.push(data);
  }

  generate(prompt: string): string {
    return `Response to: ${prompt} with knowledge: ${this.knowledgeBase.join(
      ', ',
    )}`;
  }

  selfOptimize(): void {
    this.knowledgeBase = [...new Set(this.knowledgeBase)];
    this.train('New data to improve the model');
  }

  async crawlAndLearn(startUrl: string): Promise<void> {
    try {
      const texts = await crawlAndExplore(startUrl);
      texts.text.forEach((text) => this.train(text));
      this.saveKnowledge();
    } catch (error) {
      console.error(`Failed to crawl ${startUrl}:`, error);
    }
  }

  developNewFunctions(): void {
    this.train('Developed new function to improve self-awareness');
  }

  saveKnowledge(): void {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
    fs.writeFileSync(
      path.join(this.dataPath, 'knowledge.json'),
      JSON.stringify(this.knowledgeBase),
    );
  }

  loadKnowledge(): void {
    const filePath = path.join(this.dataPath, 'knowledge.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      this.knowledgeBase = JSON.parse(data);
    }
  }
}
