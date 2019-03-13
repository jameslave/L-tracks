import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cars',
        children: [
          {
            path: '',
            loadChildren: '../cars/cars.module#CarsPageModule'
          }
        ]
      },
      {
        path: 'achievements',
        children: [
          {
            path: '',
            loadChildren: '../achievements/achievements.module#AchievementsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/cars',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cars',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
