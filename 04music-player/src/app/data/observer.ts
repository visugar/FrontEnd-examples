/**
 * Created by uidq0157 on 2017/6/23.
 */


class Subject {
  constructor() {

  }

  private list = [];

  publish(obj) {
    for (let func of this.list) {
      func(obj);
    }
  }

  subscribe(func) {
    this.list.push(func);
  }

  unsubscribe() {

  }
}

export { Subject };
