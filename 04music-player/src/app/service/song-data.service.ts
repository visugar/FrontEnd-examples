/**
 * Created by uidq0157 on 2017/6/23.
 */
import { Injectable } from '@angular/core';
import { Song } from '../data/song';
import { SongListService } from './song-list.service';

@Injectable()
export class SongDataService {
  songListService: any;
  constructor(songListService: SongListService) {
    this.songListService = songListService;
  }

  /*上一首*/
  prev() {
    let songList = Song.getSongList();
    let index = Song.getIndex();

    if (index < 0) return;

    //获取上一首歌的信息
    Song.setPrevIndex(index);
    Song.setIndex(index - 1);
    Song.setStatus('play');
    Song.setCurryTime(0);
    Song.setTotalTime(0);
    Song.update();
  }

  /*下一首*/
  next() {
    let songList = Song.getSongList();
    let index = Song.getIndex();

    if (index > songList.length) return;

    Song.setPrevIndex(index);
    Song.setIndex(index + 1);
    Song.setStatus('play');
    Song.setCurryTime(0);
    Song.setTotalTime(0);
    Song.update();
  }

  /*播放*/
  playOn(item?) {
    console.log('on');
    if (item) {
      Song.setIndex(item);
    }
    Song.setStatus('play');
    Song.update();
  }


  /*暂停*/
  pauseOff() {
    console.log('off');
    Song.setStatus('stop');
    Song.update();
  }

  /*设置当前歌曲id*/
  setSongId(id) {
    Song.setSongId(id);
    Song.update();

  }

  /*设置当前播放歌曲当前时间*/
  setCurrentTime(time) {
    Song.setCurryTime(time);
    Song.update();
  }

  /*设置当前歌曲总时间*/
  setTotalTime(time) {
    Song.setTotalTime(time);
  }

  /*设置当前时间及进度*/
  pogress(currytime, value) {
    Song.setCurryTime(currytime);
    Song.setProgressValue(value);
    Song.update();
  }

  /*设置音量*/
  volume(value) {
    Song.setVolume(value);
    Song.update();
  }

  /*设置当前所处分组*/
  setRoute(typeName, keyword?) {
    Song.setType(typeName);
    if (keyword) {
      Song.setKeyWord(keyword);
    }
    Song.update();
  }

  /*数据初始化*/
  init(typeName?, key?) {
    if ((typeName == 'search' && key != '') || (Song.getType() == 'search')) {
      /*当分类为search时根据输入的字段请求*/
      let key = Song.getKeyWord();
      this.songListService.getKeySongs(key).subscribe(
        data => {
          let result = JSON.parse(data._body);
          let songList = result.showapi_res_body.pagebean.contentlist;
          Song.setSongList(songList);
          let i = Song.getIndex();
          Song.setSongId(songList[i].songid);
          Song.setStatus('stop');
          Song.setProgressValue(0);
          Song.setPrevIndex(-1);
          Song.setVolume(0.5);

          Song.update();
          //console.log('这里是初始化一次');
        }
      );


    } else {
      this.songListService.getHotSongs().subscribe(
        data => {
          let result = JSON.parse(data._body);
          let songList = result.showapi_res_body.pagebean.songlist;
          Song.setSongList(songList);
          let i = Song.getIndex();
          Song.setTotalTime(songList[i].seconds);
          Song.setSongId(songList[i].songid);

          Song.update();
          //console.log('这里是初始化一次');
        }
      );
    }


  }
}
