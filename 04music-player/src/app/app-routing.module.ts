/**
 * Created by uidq0157 on 2017/6/20.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongListComponent } from './song-list/song-list.component';
import { SongPlayComponent } from './song-play/song-play.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catelog/hot',
    pathMatch: 'full'
  },
  {
    path: 'catelog/:typeName',
    component: SongListComponent
  },
  {
    path: 'catelog/hot',
    component: SongListComponent
  },
  {
    path: 'play',
    component: SongPlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
