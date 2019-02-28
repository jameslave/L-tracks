import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import achievements from '../achievements';
import Achievement from '../models/Achievement.js';
import Car from '../models/Car.js';
import UserAchievement from '../models/UserAchievement.js';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private storage: Storage) {
    this.achievements = achievements;
    this.init();
  }

  readonly achievements: { [id: string]: Achievement } = {};
  userAchievements: { [id: string]: UserAchievement } = {};

  init() {
    this.loadUserAchievementsFromStorage();
  }

  async saveUserAchievementsToStorage(
    userAchievements?: { [id: string]: UserAchievement }
  ): Promise<void> {
    await this.storage.set('userAchievements', userAchievements || this.userAchievements);
  }

  async loadUserAchievementsFromStorage(): Promise<void> {
    await this.storage.ready();
    const userAchievements = await this.storage.get('userAchievements');
    if (userAchievements) {
      this.userAchievements = userAchievements;
    } else {
      this.userAchievements = {};
      await this.saveUserAchievementsToStorage();
    }
  }

  checkForNewAchievements(context: { [id: string]: Car }): void {
    for (const id in this.achievements) {
      if (!this.userAchievements[id] && this.achievements[id].validator(context)) {
        const newUserAchievement: UserAchievement = {
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        };
        this.userAchievements[id] = newUserAchievement;
      }
    }
    this.saveUserAchievementsToStorage();
  }
}
