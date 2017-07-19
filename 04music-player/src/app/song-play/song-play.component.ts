import { Component, OnInit } from '@angular/core';
import { Song } from '../data/song';
import {SongDataService} from '../service/song-data.service';

import { SongListService } from '../service/song-list.service';

@Component({
  selector: 'app-song-play',
  templateUrl: './song-play.component.html',
  styleUrls: ['./song-play.component.css']
})
export class SongPlayComponent implements OnInit {
  private songList;
  private currentImg; //当前要显示的大图资源
  private currentLrc; //当前要显示的歌词资源
  private currentSong; //当前显示歌曲
  private lrcWrap;

  constructor(
    private songDataService: SongDataService,
    private songListService: SongListService
  ) {
    Song.subject.subscribe((data) => {
      //console.log(data);
      this.songList = data.songList;
      this.getImage(data);
      this.getLrc(data);

    });

    /*初始化获得歌曲列表，并将歌曲分发出去*/
    songDataService.init();
  }

  /*获取图片及歌词资源*/
  getImage(data) {
    this.currentImg = data.songList[data.index].albumpic_big;
  }

  /*通过服务来获取歌词*/
  getLrc(data) {
    let songid = data.songid;
    this.songListService.getCurrentLrc(songid).subscribe(
      data => {
        let result = JSON.parse(data._body);
        let lrc = result.showapi_res_body.lyric_txt;
        /*使用正则表达式将获取到的歌词长空格变成*/
        if (lrc) {
          lrc = lrc.replace(/\s{5,40}/g, '<br/>');
          lrc = lrc.slice(5);  //去除第一个换行符<br/>
          this.lrcWrap.innerHTML = lrc;
        }/*else{
          
        }*/
      });
  }


  ngOnInit() {
   this.lrcWrap = document.getElementsByClassName('lrc')[0];
   this.lrcWrap.innerHTML = '<img src="../../assets/imgs/loading.gif" alt="正在努力加载中……">';
  }

}
