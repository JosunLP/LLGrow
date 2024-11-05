
import { BasicLLM } from './BasicLLM';
import { crawlAndExplore } from '../utils/crawler';
import { processImage } from '../utils/imageProcessor';
import { processAudio } from '../utils/audioProcessor';
import { UserProfileManager, UserProfile } from '../utils/userProfile';

export class AdvancedLLM extends BasicLLM {
    private optimizationHistory: string[] = [];
    private userProfileManager: UserProfileManager;

    constructor() {
        super();
        this.userProfileManager = new UserProfileManager();
    }

    async crawlAndLearn(startUrl: string): Promise<void> {
        const { text, images, audio } = await crawlAndExplore(startUrl);

        // Train with text data
        text.forEach(t => this.train(t));

        // Process and train with image data
        for (const imgUrl of images) {
            const imageData = await processImage(imgUrl);
            this.train(imageData);
        }

        // Process and train with audio data
        for (const audioUrl of audio) {
            const audioData = await processAudio(audioUrl);
            this.train(audioData);
        }

        this.optimizationHistory.push(`Crawled and learned from ${startUrl} with multi-modal data at ${new Date().toISOString()}`);
        this.saveKnowledge();
    }

    // Adaptive Learning: Generate a response based on user preferences
    generate(prompt: string, userId?: string): string {
        const userProfile = userId ? this.userProfileManager.getUserProfile(userId) : this.userProfileManager.getDefaultProfile("defaultUserId");

        // Adjust tone based on user preferences
        let response = super.generate(prompt);
        if (userProfile.preferences.preferredTone === "casual") {
            response = `Hey! ${response}`;
        } else if (userProfile.preferences.preferredTone === "formal") {
            response = `Dear user, ${response}`;
        }

        // Update user interaction history
        if (userId) {
            this.userProfileManager.updateUserProfile(userId, { interactionHistory: [prompt] });
        }

        return response;
    }

    // Update user preferences based on interaction or explicit feedback
    updateUserPreferences(userId: string, preferences: Partial<UserProfile["preferences"]>): void {
        const currentPreferences = this.userProfileManager.getUserProfile(userId).preferences;
        const updatedPreferences = { ...currentPreferences, ...preferences };
        this.userProfileManager.updateUserProfile(userId, { preferences: updatedPreferences });
    }
}
