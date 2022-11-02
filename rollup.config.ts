import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import uglify from '@lopatnov/rollup-plugin-uglify';
import json from '@rollup/plugin-json';

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
    typescript({ compilerOptions: {
      target
    } }),

    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),

    uglify(),
  ],
});

export default [
  {
    input,
    output: [
      { file: output('es5'), format: 'cjs', sourcemap: true, exports: 'named' },
      { file: output('umd'), format: 'umd', sourcemap: true, name: 'kefetchup', exports: 'named' },
      { file: output('iife'), format: 'iife', sourcemap: true, name: 'kefetchup', exports: 'named' },
    ],
    ...common('es5')
  },
  {
    input,
    output: { file: output('es'), format: 'es', sourcemap: true },
    ...common('es6')
  }
];
