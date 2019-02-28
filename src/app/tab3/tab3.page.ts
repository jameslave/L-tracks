import { Component } from '@angular/core';
import { AchievementsService } from '../services/achievements.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private achievementsService: AchievementsService) { }

  get achievements() {
    return Object.values(this.achievementsService.achievements);
  }
}
