import { MusicPlayerPage } from './app.po';

describe('music-player App', () => {
  let page: MusicPlayerPage;

  beforeEach(() => {
    page = new MusicPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
