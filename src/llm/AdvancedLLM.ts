
import { BasicLLM } from './BasicLLM';
import fs from 'fs';
import path from 'path';

export class AdvancedLLM extends BasicLLM {
    private optimizationHistory: string[] = [];

    selfOptimize(): void {
        super.selfOptimize();
        this.optimizationHistory.push(`Optimization performed at ${new Date().toISOString()}`);
        this.saveKnowledge();
    }

    generate(prompt: string): string {
        const baseResponse = super.generate(prompt);
        if (this.optimizationHistory.length > 0) {
            return `Advanced Response: ${baseResponse} (optimized at ${this.optimizationHistory.slice(-1)[0]})`;
        } else {
            return `Advanced Response: ${baseResponse}`;
        }
    }

    async crawlAndLearn(startUrl: string): Promise<void> {
        await super.crawlAndLearn(startUrl);
        this.optimizationHistory.push(`Crawled and learned from ${startUrl} at ${new Date().toISOString()}`);
        this.saveKnowledge();
    }

    developNewFunctions(): void {
        super.developNewFunctions();
        this.optimizationHistory.push(`Developed new function at ${new Date().toISOString()}`);
        this.saveKnowledge();
    }

    saveKnowledge(): void {
        super.saveKnowledge();
        fs.writeFileSync(
            path.join(this.dataPath, 'optimizationHistory.json'),
            JSON.stringify(this.optimizationHistory)
        );
    }

    loadKnowledge(): void {
        super.loadKnowledge();
        const filePath = path.join(this.dataPath, 'optimizationHistory.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.optimizationHistory = JSON.parse(data);
        }
    }
}
