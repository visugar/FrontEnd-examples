import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPlayComponent } from './song-play.component';

describe('SongPlayComponent', () => {
  let component: SongPlayComponent;
  let fixture: ComponentFixture<SongPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
