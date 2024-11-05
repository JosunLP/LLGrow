
export interface LLM {
    train(data: string): void;
    generate(prompt: string): string;
    selfOptimize(): void;
    crawlAndLearn(startUrl: string): Promise<void>;
    developNewFunctions(): void;
    saveKnowledge(): void;
    loadKnowledge(): void;
}
