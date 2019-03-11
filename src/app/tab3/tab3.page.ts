import { Component } from '@angular/core';
import { pickBy, orderBy} from 'lodash';
import { AchievementsService } from '../services/achievements.service';
import Achievement from '../models/Achievement';
import UserAchievement from '../models/UserAchievement';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private achievementsService: AchievementsService) { }

  get achievements(): { [id: string]: Achievement } {
    return this.achievementsService.achievements;
  }

  get lockedAchievementIds(): string[] {
    const lockedIds = Object.entries(this.userAchievements)
      .filter((userAchievement) => {
        return !userAchievement[1].isAchieved;
      })
      .map(entry => entry[0]);
    return lockedIds;
  }

  get unlockedAchievementIds(): string[] {
    const unlockedAchievements = Object.entries(this.userAchievements)
    .filter((userAchievement) => {
        return userAchievement[1].isAchieved;
      });
    const unlockedIds = orderBy(
      unlockedAchievements,
      [e => new Date(e[1].achievedAt)],
      ['desc'],
      )
      .map(entry => entry[0]);
    return unlockedIds;
  }

  get userAchievements(): { [id: string]: UserAchievement } {
    return this.achievementsService.userAchievements;
  }
}
