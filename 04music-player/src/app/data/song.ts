/**
 * Created by uidq0157 on 2017/6/22.
 */
import { Subject } from './observer';

let Song = {

  songList: [],
  status: 'stop',
  curryTime: 0,
  totalTime: 0,
  progressValue: 0,
  prevIndex: -1, //负的表示没有上一次的点击
  index: 0,
  songid: 0,
  volume: 0.5,
  typeName: 'hot',
  keyWord: '',

  subject: new Subject(),

  getSongList: function () {
    return this.songList;
  },
  setSongList: function (data) {
    this.songList = data;
  },

  getCurryTime() {
    return this.curryTime;
  },
  setCurryTime(time) {
    this.curryTime = time;
  },

  getTotalTime() {
    return this.totalTime;
  },
  setTotalTime(time) {
    this.totalTime = time;
  },

  getProgressValue() {
    return this.progressValue;
  },
  setProgressValue(value) {
    this.progressValue = value;
  },

  getPrevIndex: function () {
    return this.prevIndex;
  },
  setPrevIndex: function (prevI) {
    this.prevIndex = prevI;
  },

  getIndex: function () {
    return this.index;
  },
  setIndex: function (i) {
    this.index = i;
  },

  getStatus: function () {
    return this.status;
  },
  setStatus: function (status) {
    this.status = status;
  },

  getSongId: function () {
    return this.songid;
  },
  setSongId: function (songid) {
    this.songid = songid;
  },

  getVolume() {
    return this.volume;
  },
  setVolume(volume) {
    this.volume = volume;
  },

  setType(typeName) {
    this.typeName = typeName;
  },
  getType() {
    return this.typeName;
  },

  setKeyWord(keyword) {
    this.keyWord = keyword;
  },
  getKeyWord() {
    return this.keyWord;
  },

  update: function () {
    this.subject.publish({
      songList: this.songList,
      status: this.status,
      curryTime: this.curryTime,
      totalTime: this.totalTime,
      progressValue: this.progressValue,
      prevIndex: this.prevIndex,
      index: this.index,
      songid: this.songid,
      volume: this.volume,
      typeName: this.typeName,
      keyWord: this.keyWord,
    });
  }
};
export { Song };
