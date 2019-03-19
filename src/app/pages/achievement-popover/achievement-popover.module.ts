import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AchievementPopoverPage } from './achievement-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AchievementPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AchievementPopoverPage]
})
export class AchievementPopoverPageModule {}
