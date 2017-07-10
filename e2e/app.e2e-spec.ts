import { FreshStartPage } from './app.po';

describe('fresh-start App', () => {
  let page: FreshStartPage;

  beforeEach(() => {
    page = new FreshStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
