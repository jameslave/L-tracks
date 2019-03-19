import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  },
  {
    path: 'achievement-popover/:achievementId',
    loadChildren: './pages/achievement-popover/achievement-popover.module#AchievementPopoverPageModule',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
