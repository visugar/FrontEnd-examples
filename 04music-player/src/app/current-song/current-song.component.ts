import {Component, OnInit} from '@angular/core';
import {SongDataService} from '../service/song-data.service';
import { Song } from '../data/song';

@Component({
  selector: 'app-current-song',
  templateUrl: './current-song.component.html',
  styleUrls: ['./current-song.component.css']
})
export class CurrentSongComponent implements OnInit {
  private progressValue: number = 0;
  private currentTime: number;  //当前歌曲总时间
  private duration: number; //当前歌曲的当前时间
  private currentSong;  //当前歌曲
  private songObj;  //歌曲对象
  private songList;  //歌曲列表
  private songName;  //当前歌曲名称
  private singerName;  //当前歌曲的歌手
  private volume;  //当前音量
  m = true;

  private record;

  constructor(
    private songDataService: SongDataService
  ) {
    //创建一个观察者
    Song.subject.subscribe((data) => {
      //console.log(data);
      this.songObj = data;
      this.songList = data.songList;  //得到歌曲列表用于显示层

      this.currentSong = data.songList[data.index];

      /*播放暂停按钮控制*/
      if (data.status == 'play') {
        this.play(data.index);
      } else if (data.status == 'stop') {
        this.stop();
      }

      this.curryShow(data, data.index);  //当前歌曲显示初始化

    });
  }

  $(val, node?) {
    return (node || document).querySelector(val);
  }

  curryShow(data, i) {
    //this.currentSong = data.songList[i];
    if (this.currentSong) {
      this.progressValue = data.progressValue;
      this.duration = this.currentSong.seconds;
      this.currentTime = data.curryTime;
      this.songName = this.currentSong.songname;
      this.singerName = this.currentSong.singername;
    }

    this.volume = data.volume;  //获取音量
  }


  /*播放*/
  play(item) {
    let playBtn = this.$('#play');
    let iconPlay = this.$('i', playBtn);
    let audControl = this.$('.audControl');

    if (isNaN(this.record)) {
      audControl.src = ((this.songList)[item].url) || ((this.songList)[item].m4a);
    } else if (item != this.record) {
      audControl.src = ((this.songList)[item].url) || ((this.songList)[item].m4a);
    } else {

    }

    this.record = item;

    audControl.play();

    audControl.volume = this.volume;

    iconPlay.style.backgroundPosition = '-30px 0';

  }

  //播放器时间更新时绑定一个播放进度及当前时间显示改变的事件
  onProgress() {
    let audControl = this.$('.audControl');
    audControl.addEventListener('timeupdate', () => { this.changeProgress(audControl) });
  }

  /*播放进度及时间显示改变*/
  changeProgress(audio) {
    let current = audio.currentTime;
    let duration = audio.duration;
    let proValue;

    if (!isNaN(duration)) {
      proValue = current / duration;
      if (proValue == 1) {
        proValue = 0;
      }
      if ((duration - current) < 0.5) {
        //this.songDataService.pogress(0,0);
        this.next();  //在这里可以控制播放顺序
      }
      this.$('.curPro').style.width = (proValue) * 100 + '%';
      this.m && (this.$('.curProCir').style.left = (proValue) * 100 + '%');
    }

    /*更改当前时间及播放进度*/
    let seconds = parseInt(current);
    if (seconds > 0 && proValue > 0) {
      this.songDataService.pogress(seconds, proValue);
    }
  }

  /*暂停*/
  stop() {
    let playBtn = this.$('#play');
    let iconPlay = this.$('i', playBtn);
    let audControl = this.$('.audControl');

    audControl.pause();
    iconPlay.style.backgroundPosition = '0 0';
  }

  /*点击播放暂停按钮触发的事件*/
  playOrOff(audio) {
    if (this.songObj.status == 'stop') {
      this.songDataService.playOn();
    } else if (this.songObj.status == 'play') {
      this.songDataService.pauseOff();
    }
  }

  /*点击上一首*/
  prev() {
    if (this.songObj.index == 0) {
      this.$('#prev').title = '已为第一首歌曲！';
      this.$('#prev').disabled = true;
    } else {
      this.songDataService.prev();
    }
  }

  /*点击下一首*/
  next() {
    if (this.songObj.index == (this.songList.length - 1)) {
      this.$('#prev').title = '已为最后一首歌曲！';
      this.$('#next').disabled = true;
    } else {
      this.songDataService.next();
    }

  }

  /*初始化设置音量显示*/
  volumeInit() {
    let volPro = this.$('.volPro');  //当前音量白色区域长度
    let volProCir = this.$('.volProCir');  //当前音量的小圆点

    let volume = this.volume || '0.5';

    volPro.style.width = Number(volume) * 100 + '%';
    volProCir.style.left = Number(volume) * 100 + '%';
  }

  /*初始化设置进度条显示*/
  setProgress() {
    let progress = this.$('#progress');
    let curPro = this.$('.curPro');
    let curProCir = this.$('.curProCir');

    let self = this;
    let progreVal;
    let currentTime;

    /*调节进度（目前只写了通过点击来改变进度的事件）*/
    progress.onmousedown = function (e) {
      let ev = e || window.event;
      let target = ev.target || e.srcElement;
      let mX = e.pageX;  //鼠标位置
      let X = progress.getBoundingClientRect().left;  //元素起点位置
      let widX = progress.clientWidth; //元素的宽度

      let totelTime = self.songObj.totalTime;

      /*将计算好的百分比设置到下面*/
      progreVal = ((mX - X) / widX).toFixed(2);
      if (progreVal >= 0 && progreVal <= 1) {
        curProCir.style.left = progreVal * 100 + '%';
        curPro.style.width = progreVal * 100 + '%';
        currentTime = progreVal * totelTime;  //计算当前时间
      } else {
        return;
      }
    }

    progress.onmouseup = function (e) {
      //console.log(progreVal, currentTime);
      let audControl = self.$('.audControl');
      audControl.currentTime = currentTime;
      self.songDataService.pogress(currentTime, progreVal);  //将进度及时间设置到服务端
    }
  }

  /*调节音量（只支持通过点击来改变）*/
  setVolume() {
    let volIcon = this.$('.volIcon');
    let volPro = this.$('.volPro');  //当前音量白色区域长度
    let volProCir = this.$('.volProCir');  //当前音量的小圆点
    let volumeWrap = this.$('#volume-wrap');
    let self = this;
    let volumeVal;
    volumeWrap.onmousedown = function (e) {
      let ev = e || window.event;
      let target = ev.target || e.srcElement;
      let mX = e.pageX;  //鼠标位置
      let X = volumeWrap.getBoundingClientRect().left;  //元素起点位置
      let widX = volumeWrap.clientWidth; //元素的宽度

      /*将计算后的百分比设置到如下*/
      volumeVal = ((mX - X) / widX).toFixed(2);
      if (volumeVal >= 0) {
        volProCir.style.left = volumeVal * 100 + '%';
        volPro.style.width = volumeVal * 100 + '%';
      } else {
        return;
      }
    }

    volumeWrap.onmouseup = function (e) {
      if (volumeVal <= 0) {
        volIcon.style.backgroundPosition = '0 -180px';
      } else {
        volIcon.style.backgroundPosition = '0 -142px';
      }
      self.songDataService.volume(volumeVal);  //将音量设置到服务端
    }
  }

  ngOnInit() {
    this.onProgress(); //进度显示
    this.volumeInit();  //音量初始化显示
    this.setProgress();
    this.setVolume();  //音量设置
  }

}
