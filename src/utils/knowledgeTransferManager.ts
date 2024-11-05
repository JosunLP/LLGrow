
import * as fs from 'fs';
import * as path from 'path';

export interface ExternalKnowledge {
    data: string[];
    sourceModel: string;
}

export class KnowledgeTransferManager {
    private knowledgePath: string;

    constructor() {
        this.knowledgePath = path.resolve(__dirname, '../../data/externalKnowledge.json');
        if (!fs.existsSync(this.knowledgePath)) {
            fs.writeFileSync(this.knowledgePath, JSON.stringify([]));
        }
    }

    // Save external knowledge
    saveExternalKnowledge(knowledge: ExternalKnowledge): void {
        const knowledgeList = this.getAllKnowledge();
        knowledgeList.push(knowledge);
        fs.writeFileSync(this.knowledgePath, JSON.stringify(knowledgeList, null, 2));
    }

    // Get all external knowledge
    getAllKnowledge(): ExternalKnowledge[] {
        const data = fs.readFileSync(this.knowledgePath, 'utf-8');
        return JSON.parse(data);
    }

    // Merge external knowledge into internal knowledge base
    mergeKnowledge(currentKnowledge: string[], newKnowledge: ExternalKnowledge): string[] {
        const combinedKnowledge = new Set([...currentKnowledge, ...newKnowledge.data]);
        return Array.from(combinedKnowledge);
    }
}
