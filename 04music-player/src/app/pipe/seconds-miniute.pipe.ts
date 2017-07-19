/**
 * Created by uidq0157 on 2017/6/21.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'format'
})

export class formatPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (value && (!isNaN(value))) {
      if (value / 60 < 10 && (value % 60) < 10) {
        return '0' + Math.floor(value / 60) + ":" + '0' + Number((value % 60).toLocaleString().slice(0, 2));
      } else if (value / 60 < 10 && (value % 60) >= 10) {
        return '0' + Math.floor(value / 60) + ":" + Number((value % 60).toLocaleString().slice(0, 2));
      }
      else if (value / 60 >= 10 && (value % 60) < 10) {
        return Math.floor(value / 60) + ":" + '0' + Number((value % 60).toLocaleString().slice(0, 2));
      }
      else {
        return Math.floor(value / 60) + ":" + Number((value % 60).toLocaleString().slice(0, 2));
      }
    }


  }
}
