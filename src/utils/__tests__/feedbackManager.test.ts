
import { FeedbackManager } from '../feedbackManager';

describe('FeedbackManager', () => {
  let feedbackManager: FeedbackManager;

  beforeEach(() => {
    feedbackManager = new FeedbackManager();
  });

  it('should save and retrieve feedback', () => {
    const feedback = { responseId: 'response1', userId: 'user123', helpful: true };
    feedbackManager.saveFeedback(feedback);
    const allFeedback = feedbackManager.getAllFeedback();
    expect(allFeedback).toContainEqual(feedback);
  });

  it('should filter negative feedback', () => {
    const feedback1 = { responseId: 'response1', userId: 'user123', helpful: true };
    const feedback2 = { responseId: 'response2', userId: 'user123', helpful: false, comment: 'Not useful' };
    feedbackManager.saveFeedback(feedback1);
    feedbackManager.saveFeedback(feedback2);
    const negativeFeedback = feedbackManager.getNegativeFeedback();
    expect(negativeFeedback).toContainEqual(feedback2);
  });
});
