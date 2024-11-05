
import { AdvancedLLM } from './llm/AdvancedLLM';

(async () => {
    const llm = new AdvancedLLM();
    llm.train('Initial training data');
    console.log(llm.generate('What is the meaning of life?'));

    // Multi-modal Crawling and Learning
    await llm.crawlAndLearn('https://example.com');
    console.log(llm.generate('Summarize the learned data'));

    // Output for verification
    console.log(llm.generate('What are key takeaways from this session?'));
})();
