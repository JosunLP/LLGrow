
export interface BiasCheckResult {
    isBiased: boolean;
    biasScore: number; // A score between 0 (no bias) and 100 (highly biased)
    issues: string[]; // List of detected issues
}

export class BiasChecker {
    private biasKeywords: string[];

    constructor() {
        this.biasKeywords = [
            'stereotype',
            'discriminate',
            'racist',
            'sexist',
            'biased',
            'unfair',
            'prejudice'
        ];
    }

    // Method to analyze text and return bias score and issues
    analyzeText(text: string): BiasCheckResult {
        let biasScore = 0;
        const issues: string[] = [];

        this.biasKeywords.forEach(keyword => {
            const keywordRegex = new RegExp(`\b${keyword}\b`, 'i');
            if (keywordRegex.test(text)) {
                biasScore += 20; // Increase bias score for each occurrence of a bias keyword
                issues.push(`Detected potentially biased term: "${keyword}"`);
            }
        });

        // Limit bias score between 0 and 100
        biasScore = Math.min(biasScore, 100);

        return {
            isBiased: biasScore > 0,
            biasScore,
            issues
        };
    }
}
