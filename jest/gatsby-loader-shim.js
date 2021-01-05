/*
 * Gatsby attaches some global state to the window object via window.___somevar
 * variables so they can be used by plugins
 * ref: https://github.com/gatsbyjs/gatsby/blob/deb41cdfefbefe0c170b5dd7c10a19ba2b338f6e/docs/docs/production-app.md#window-variables
 */
global.___loader = {
  enqueue: jest.fn(),
};
