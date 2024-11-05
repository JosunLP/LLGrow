
import { AdvancedLLM } from '../AdvancedLLM';

describe('AdvancedLLM', () => {
  let llm: AdvancedLLM;

  beforeEach(() => {
    llm = new AdvancedLLM();
  });

  it('should generate response with casual tone', () => {
    llm.updateUserPreferences('user123', { preferredTone: 'casual' });
    const response = llm.generate('Tell me something interesting', 'user123');
    expect(response).toContain('Hey!');
  });

  it('should log feedback and handle it', () => {
    llm.handleFeedback('response1', 'user123', false, 'The response was not detailed enough.');
    // No explicit assertions needed, but no errors should occur
  });

  it('should optimize itself based on feedback', () => {
    llm.handleFeedback('response1', 'user123', false, 'Improve accuracy');
    llm.selfOptimize();
    // Ensure optimization log contains the handled feedback
    const logContainsOptimization = llm.optimizationHistory.some(log => log.includes('handled negative feedback'));
    expect(logContainsOptimization).toBe(true);
  });
});
