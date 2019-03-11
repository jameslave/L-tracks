import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { sortBy } from 'lodash';

import achievements from '../achievements';
import Achievement from '../models/Achievement.js';
import Car from '../models/Car.js';
import UserAchievement from '../models/UserAchievement.js';
import { MigrationsService } from './migrations.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(
    private storage: Storage,
    private migrationsService: MigrationsService,
  ) { }

  achievements: { [id: string]: Achievement } = {};
  userAchievements: { [id: string]: UserAchievement } = {};

  init() {
    this.achievements = this.sortAchievements(achievements);
    this.loadUserAchievementsFromStorage();
  }

  public sortAchievements(
    achievementsToSort: {[id: string]: Achievement}
    ): {[id: string]: Achievement} {
    const sortedAchievements = {};
    const sortedEntries = sortBy(Object.entries(achievements), [entry => (entry[1] as Achievement).name.toLowerCase()]);
    sortedEntries.forEach(entry => {
      sortedAchievements[`${entry[0]}`] = entry[1];
    });
    return sortedAchievements;
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
      this.migrationsService.runUserAchievementsMigrations(this.userAchievements);
    } else {
      this.userAchievements = {};
    }
    for (const id in this.achievements) {
      if (!this.userAchievements[id]) {
        this.userAchievements[id] = {
          isAchieved: false,
          ...(this.achievements[id].type === 'multiple' ? { progress: 0 } : {})
        };
      } else {
        this.userAchievements[id] = userAchievements[id];
      }
    }
    await this.saveUserAchievementsToStorage();
  }

  checkForNewAchievements(context: { [id: string]: Car }): void {
    for (const id in this.achievements) {
      if (!this.userAchievements[id].isAchieved) {
        const { isAchieved, progress } = this.achievements[id].validator(context);
        if (isAchieved) {
          this.userAchievements[id].isAchieved = isAchieved;
          this.userAchievements[id].achievedAt = new Date().toISOString();
        }
        if (progress) {
          this.userAchievements[id].progress = progress;
        }
      }
    }
    this.saveUserAchievementsToStorage();
  }
}
