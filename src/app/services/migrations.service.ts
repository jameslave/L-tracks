import { Injectable } from '@angular/core';

import Car from '../models/Car';
import UserAchievement from '../models/UserAchievement';

@Injectable({
  providedIn: 'root'
})
export class MigrationsService {
  private carMigrations: Array<(car: Car) => void>;
  private userAchievementMigrations: Array<(userAchievement: UserAchievement) => void>;

  constructor() {
    this.carMigrations = [
      (car: Car) => {
        if (!Array.isArray(car.updatedAt)) {
          car.updatedAt = [car.updatedAt];
        }
      },
    ];

    this.userAchievementMigrations = [];
  }

  runUserAchievementsMigrations(
    userAchievements: { [id: number]: UserAchievement }
  ): { [id: number]: UserAchievement } {
    const userAchievementIds = Object.keys(userAchievements);
    userAchievementIds.forEach(id => {
      this.userAchievementMigrations.forEach(achievementMigration => {
        achievementMigration(userAchievements[id]);
      });
    });
    return userAchievements;
  }

  runCarsMigrations(cars: { [id: string]: Car }): { [id: string]: Car } {
    const carIds = Object.keys(cars);
    carIds.forEach(id => {
      this.carMigrations.forEach(carMigration => {
        carMigration(cars[id]);
      });
    });
    return cars;
  }
}
