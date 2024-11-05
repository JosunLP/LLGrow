export interface UserProfile {
  id: string;
  preferences: {
    preferredTone: string; // e.g., formal, casual
    interests: string[]; // e.g., tech, sports, art
  };
  interactionHistory: string[];
}

export class UserProfileManager {
  private profiles: Map<string, UserProfile>;

  constructor() {
    this.profiles = new Map();
  }

  getUserProfile(userId: string): UserProfile {
    if (!this.profiles.has(userId)) {
      // Initialize a default profile
      this.profiles.set(userId, {
        id: userId,
        preferences: {
          preferredTone: 'neutral',
          interests: [],
        },
        interactionHistory: [],
      });
    }
    return this.profiles.get(userId)!;
  }

  updateUserProfile(userId: string, update: Partial<UserProfile>): void {
    const profile = this.getUserProfile(userId);
    if (update.preferences) {
      profile.preferences = { ...profile.preferences, ...update.preferences };
    }
    if (update.interactionHistory) {
      profile.interactionHistory.push(...update.interactionHistory);
    }
  }

  getDefaultProfile(userId: string): UserProfile {
    return {
      id: userId,
      preferences: {
        preferredTone: 'neutral',
        interests: [],
      },
      interactionHistory: [],
    };
  }
}
