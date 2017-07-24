import { AngularFormsTaskPage } from './app.po';

describe('angular-forms-task App', () => {
  let page: AngularFormsTaskPage;

  beforeEach(() => {
    page = new AngularFormsTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
