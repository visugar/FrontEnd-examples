/**
 * Created by uidq0157 on 2017/6/20.
 */
import {Injectable}              from '@angular/core';
import {Http, Response}          from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SongListService {

  constructor(private http: Http) { }

  /*获取热门歌曲列表*/
  getHotSongs() {
    let url = 'http://route.showapi.com/213-4?showapi_appid=40461&showapi_sign=479e7dd0543d434dbb1aa574af424213&topid=26';
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*根据songid获取当前歌曲的歌词*/
  getCurrentLrc(id) {
    let url = `http://route.showapi.com/213-2?showapi_appid=40461&showapi_sign=479e7dd0543d434dbb1aa574af424213&topid=26&musicid=${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getKeySongs(keyword) {
    let url = `http://route.showapi.com/213-1?showapi_appid=40461&showapi_sign=479e7dd0543d434dbb1aa574af424213&keyword=${keyword}&page=1`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
