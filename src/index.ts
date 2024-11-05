import { AdvancedLLM } from "./llm/AdvancedLLM";
import { JSDOM } from "jsdom";

const { window } = new JSDOM();
const { document } = window;

(async () => {
  const llm = new AdvancedLLM();
  await llm.initDb();
  llm.train("Initial training data");
  console.log(llm.generate("What is the meaning of life?"));
  llm.selfOptimize();
  console.log(llm.generate("What is the meaning of life?"));

  // Crawling and learning from a website
  await llm.crawlAndLearn("https://example.com");
  console.log(llm.generate("What is the meaning of life?"));

  // Developing new functions
  llm.developNewFunctions();
  console.log(llm.generate("What is the meaning of life?"));

})();
