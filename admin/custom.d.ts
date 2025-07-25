declare module '@strapi/design-system/*';
declare module '@strapi/design-system';

// Based on
// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module '*.svg' {
  const content: any;
  export default content;
}
