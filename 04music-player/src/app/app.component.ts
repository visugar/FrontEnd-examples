import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { Song } from './data/song';
import {SongDataService} from './service/song-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private selected;
  constructor(
    private songDataService: SongDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  isSelected(val) {
    return val === this.selected;
  }

  onSelect(typeName) {
    this.selected = typeName;
  }

  /*初始化默认选中第一个*/
  secFirstOne() {
    let first = document.getElementsByClassName('catelog')[0].firstElementChild;
    this.selected = 'hot';
  }

  /*搜索时配置路由参数*/
  onsearch(value) {
    //console.log('打印输入参数：'+value);
    this.router.navigate(['/catelog', 'search', { keywords: value }], { relativeTo: this.route });
  }
  backToTop() {
    document.body.scrollTop = 0;
  }
  ngOnInit() {
    this.secFirstOne();
  }
}
