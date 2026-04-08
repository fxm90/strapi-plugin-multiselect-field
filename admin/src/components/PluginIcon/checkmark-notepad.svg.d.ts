// TypeScript does not natively understand SVG files as modules, so importing `./checkmark-notepad.svg` would cause a type error.
//
// This co-located declaration file tells TypeScript that the SVG module exists and exports a string
// (the asset URL as resolved by the bundler, e.g. webpack or Vite).
//
// TypeScript's module resolution picks up `./checkmark-notepad.svg.d.ts` automatically when it encounters `import ... from './checkmark-notepad.svg'`.
declare const content: string;
export default content;
