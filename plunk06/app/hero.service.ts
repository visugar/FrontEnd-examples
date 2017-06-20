import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
}
//


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/