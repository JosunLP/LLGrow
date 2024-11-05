
import { AdvancedLLM } from "./llm/AdvancedLLM";

(async () => {
    const llm = new AdvancedLLM();
    const userId = "user123";

    // Initial training and interaction
    llm.train('Initial training data');
    console.log(llm.generate('What is the meaning of life?', userId));

    // Update user preferences to be more casual
    llm.updateUserPreferences(userId, { preferredTone: 'casual' });
    console.log(llm.generate('Tell me something interesting', userId));

    // Multi-modal Crawling and Learning with advanced prioritization
    try {
        await llm.crawlAndLearn("https://example.com/");
    } catch (error) {
        console.error("Caught an error during crawling and learning:", error);
    }

    // Advanced error detection and self-optimization
    llm.selfOptimize();

    // Output for verification
    console.log(llm.generate('What are key takeaways from this session?', userId));
})();
