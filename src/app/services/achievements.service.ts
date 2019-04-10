import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController,
  ) { }

  achievements: { [id: string]: Achievement } = {};
  userAchievements: { [id: string]: UserAchievement } = {};

  init() {
    this.achievements = this.sortAchievements(achievements);
    this.loadUserAchievementsFromStorage();
  }

  public sortAchievements(
    achievementsToSort: { [id: string]: Achievement }
  ): { [id: string]: Achievement } {
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
    for (const achievementId in this.achievements) {
      const { isAchieved, progress } = this.achievements[achievementId].validator(context);
      if (isAchieved) {
        this.userAchievements[achievementId].isAchieved = isAchieved;
        this.userAchievements[achievementId].achievedAt = new Date().toISOString();
        this.notifyNewAchievement(achievementId);
      } else if (this.userAchievements[achievementId].isAchieved) {
        // If user previously achieved, undo it
        this.userAchievements[achievementId].isAchieved = false;
        delete this.userAchievements[achievementId].achievedAt
      }
      if (progress === undefined) {
        delete this.userAchievements[achievementId].progress;
      } else {
        this.userAchievements[achievementId].progress = progress;
      }
    }
    this.saveUserAchievementsToStorage();
  }

  async notifyNewAchievement(achievementId: string) {
    this.navCtrl.navigateForward(`achievement-popover/${achievementId}`);
  }
}
