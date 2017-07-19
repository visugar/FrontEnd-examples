import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSongComponent } from './current-song.component';

describe('CurrentSongComponent', () => {
  let component: CurrentSongComponent;
  let fixture: ComponentFixture<CurrentSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
