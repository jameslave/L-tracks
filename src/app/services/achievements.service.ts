import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as initialAchievements from '../../assets/achievements.json';

interface Achievement {
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: Date;
  required: {
    trains?: string[],
    stations?: string[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private storage: Storage) {
    this.init();
  }

  achievements: { [id: string]: Achievement } = {};

  get unlocked(): Achievement[] {
    if (Object.keys(this.achievements).length > 0) {
      return Object.values(this.achievements).filter(a => a.unlocked);
    }
    return [];
  }

  get locked(): Achievement[] {
    if (Object.keys(this.achievements).length > 0) {
      return Object.values(this.achievements).filter(a => !a.unlocked);
    }
    return [];
  }

  init() {
    this.loadAchievementsFromStorage();
  }

  async saveAchievementsToStorage(achievements = this.achievements): Promise<void> {
    await this.storage.set('achievements', achievements);
  }

  async loadAchievementsFromStorage(): Promise<void> {
    await this.storage.ready();
    const achievements = await this.storage.get('achievements');
    if (achievements) {
      this.achievements = achievements;
    } else {
      await this.saveAchievementsToStorage((initialAchievements as any).default);
      this.achievements = (initialAchievements as any).default;
    }
  }
}
