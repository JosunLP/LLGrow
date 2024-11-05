
import * as fs from 'fs';
import * as path from 'path';

export interface Feedback {
    responseId: string;
    userId: string;
    helpful: boolean;
    comment?: string;
}

export class FeedbackManager {
    private feedbackPath: string;

    constructor() {
        this.feedbackPath = path.resolve(__dirname, '../../data/feedback.json');
        if (!fs.existsSync(this.feedbackPath)) {
            fs.writeFileSync(this.feedbackPath, JSON.stringify([]));
        }
    }

    // Save feedback
    saveFeedback(feedback: Feedback): void {
        const feedbackList = this.getAllFeedback();
        feedbackList.push(feedback);
        fs.writeFileSync(this.feedbackPath, JSON.stringify(feedbackList, null, 2));
    }

    // Get all feedback
    getAllFeedback(): Feedback[] {
        const data = fs.readFileSync(this.feedbackPath, 'utf-8');
        return JSON.parse(data);
    }

    // Analyze feedback to determine which responses need improvement
    getNegativeFeedback(): Feedback[] {
        return this.getAllFeedback().filter(fb => !fb.helpful);
    }
}
