import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';


import { Song } from '../data/song';
import {SongDataService} from '../service/song-data.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  private typeName;
  private keywords;
  private songList;
  private currentId: number;
  private loveID: number;
  private flag = false;
  private arr = [];
  private prevNow = [];  //存放所有点击过的index值
  private songObj;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private songDataService: SongDataService
  ) {
    /*先创建一个歌曲订阅*/
    Song.subject.subscribe((data) => {

      this.songObj = data;
      this.songList = data.songList;  //得到歌曲列表用于显示层

      let oLi = document.getElementsByClassName('songs');
      let currentIcon = this.$('#play-icon', oLi[data.index]);
      //console.log(currentIcon);
      if (currentIcon) {
        if (data.status == 'stop') {
          /*需要让第index的播放按钮显示为关闭*/
          //console.log('图标显示关闭');
          currentIcon.style.backgroundPosition = '0 0';
        } else {
          /*需要让第index的播放按钮显示为开*/
          //console.log('图标显示开');
          currentIcon.style.backgroundPosition = '-40px -200px';
        }
      }

      /*当点击上一首或者下一首时需要把上一次播放的图标变成关*/
      if (data.prevIndex > 0) {
        //console.log('上一次播放的值：' + data.prevIndex);
        let prevIcon = this.$('#play-icon', oLi[data.prevIndex]);
        if (prevIcon) {
          prevIcon.style.backgroundPosition = '0 0';
        }
      }
    });

    /*初始化获得歌曲列表，并将歌曲分发出去*/
    this.route.params.subscribe(params => {
      this.typeName = params["typeName"];
      if (params["keywords"]) {
        this.keywords = params["keywords"];
        this.songDataService.setRoute(this.typeName, this.keywords);
      } else {
        this.songDataService.setRoute(this.typeName);
      }
      songDataService.init(this.typeName, this.keywords);
    });

  }

  $(val, node?) {
    return (node || document).querySelector(val);
  }

/*点击列表中某一首歌曲播放按钮*/
  onChoice(i, obj?) {
    let oLis = document.getElementsByClassName('songs');  //所有列表
    this.prevNow.push(i);  //把index值push到prevNow中
    let playIcon = this.$('#play-icon', oLis[i]); //第index个歌曲的播放图标

    if (i == this.songObj.index) {
      //如果点击的同一首则直接播放状态
      if (this.songObj.status == 'stop') {
        this.play(i);
        playIcon.style.backgroundPosition = '-40px -200px';  //图标变成播放
      } else if (this.songObj.status == 'play') {
        playIcon.style.backgroundPosition = '0 0';   //图标变成关闭
        this.stop();
      }
    } else if (i != this.songObj.index) {
      //点击的不同首,播放当前首，上一首图标变成关，这一首变成开
      let arr = [];  //定义一个临时数组
      if (this.prevNow.length < 2) {
        //arr = this.prevNow;   //
        if (this.songObj.status == 'stop') {

          this.play(i);
          playIcon.style.backgroundPosition = '-40px -200px';  //图标变成播放
        } else if (this.songObj.status == 'play') {
          let preIcon = this.$('#play-icon', oLis[this.songObj.index]);
          preIcon.style.backgroundPosition = '0 0';

          this.play(i);
          playIcon.style.backgroundPosition = '-40px -200px';  //图标变成播放
        }

      } else if (this.prevNow.length >= 2) {
        let arr = this.prevNow.slice(-2);
        let prevOn = this.$('#play-icon', oLis[arr[0]]);
        prevOn.style.backgroundPosition = '0 0';

        playIcon.style.backgroundPosition = '-40px -200px';
        this.play(i);
      }

    }
  }


  /*播放*/
  play(item) {
    this.songDataService.playOn(item);
  }

  /*暂停*/
  stop() {
    this.songDataService.pauseOff();
  }

  ngOnInit() {

  }

}
