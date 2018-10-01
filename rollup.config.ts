// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import sourceMaps from 'rollup-plugin-sourcemaps'
// import camelCase from 'lodash.camelcase'
// import typescript from 'rollup-plugin-typescript2'
// import json from 'rollup-plugin-json'

// const pkg = require('./package.json')

// const libraryName = pkg.name

// export default {
//   input: `src/index.ts`,
//   output: [
//     { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
//     { file: pkg.module, format: 'es', sourcemap: true },
//   ],
//   // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
//   external: [],
//   watch: {
//     include: 'src/**',
//   },
//   plugins: [
//     // Allow json resolution
//     json(),
//     // Compile TypeScript files
//     typescript({ useTsconfigDeclarationDir: true }),
//     // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
//     commonjs(),
//     // Allow node_modules resolution, so you can use 'external' to control
//     // which external modules to include in the bundle
//     // https://github.com/rollup/rollup-plugin-node-resolve#usage
//     resolve(),

//     // Resolve source maps to the original source
//     sourceMaps(),
//   ],
// }

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
// import pkg from './package.json';

// const libraryName = pkg.name;

const input = `src/index.ts`;
const output = format => `dist/kefetchup.${format}.js`;
const common = target => ({
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, tsconfigOverride: { compilerOptions: {
      target
    } } }),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ],
});

export default [
  {
    input,
    output: [
      { file: output('es5'), format: 'cjs', sourcemap: true, exports: 'named' },
      { file: output('umd'), format: 'umd', sourcemap: true, name: 'bound', exports: 'named' },
      { file: output('iife'), format: 'iife', sourcemap: true, name: 'bound', exports: 'named' },
    ],
    ...common('es5')
  },
  {
    input,
    output: { file: 'dist/bound.es.js', format: 'es', sourcemap: true },
    ...common('es6')
  }
];
