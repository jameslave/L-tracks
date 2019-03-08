import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CarsService } from './services/cars.service';
import { AchievementsService } from './services/achievements.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Cars',
      url: '/cars',
      icon: 'train'
    },
    {
      title: 'Achievements',
      url: '/achievements',
      icon: 'trophy'
    },
    // {
    //   title: 'Settings',
    //   url: '/settings',
    //   icon: 'settings'
    // },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private carsService: CarsService,
    private achievementsService: AchievementsService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.backgroundColorByHexString('#00b3b8');
    this.statusBar.styleLightContent();
    await this.achievementsService.init();
    await this.carsService.init();
    this.splashScreen.hide();
  }
}
