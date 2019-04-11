import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AchievementsService } from 'src/app/services/achievements.service';
import Achievement from 'src/app/models/Achievement';
import { NavController } from '@ionic/angular';
import 'confetti-js';

@Component({
  selector: 'app-achievement-popover',
  templateUrl: './achievement-popover.page.html',
  styleUrls: ['./achievement-popover.page.scss'],
})
export class AchievementPopoverPage implements AfterViewInit {
  private achievement: Achievement;

  constructor(
    private route: ActivatedRoute,
    private achievementsService: AchievementsService,
    private navCtrl: NavController,
  ) {
    const achievementId = this.route.snapshot.paramMap.get('achievementId');
    this.achievement = this.achievementsService.achievements[achievementId];
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = document.getElementById('confetti-holder') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const confettiConfig = {
      max: 30,
      clock: 20,
      rotate: true,
      props: ['circle', 'square', 'triangle'],
      animate: true,
    };
    let confetti = new (window as any).ConfettiGenerator(confettiConfig);
    confetti.render();

    window.addEventListener('resize', (e) => {
      confetti.clear();
      confetti = new (window as any).ConfettiGenerator(confettiConfig);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      confetti.render();
    });
  }

  get achievementName() {
    return this.achievement ? this.achievement.name : '';
  }

  get achievementDescription() {
    return this.achievement ? this.achievement.description : '';
  }

  closeAchievementPopover() {
    this.navCtrl.back();
  }
}
