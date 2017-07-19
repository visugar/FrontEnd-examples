import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { SongPlayComponent } from './song-play/song-play.component';
import { SongListComponent } from './song-list/song-list.component';

import { SongListService } from './service/song-list.service';
import { SongDataService } from './service/song-data.service';

import { formatPipe } from './pipe/seconds-miniute.pipe';
import { CurrentSongComponent } from './current-song/current-song.component';
@NgModule({
  declarations: [
    AppComponent,
    SongPlayComponent,
    SongListComponent,
    formatPipe,
    CurrentSongComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    AppRoutingModule
  ],
  providers: [SongListService,SongDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
