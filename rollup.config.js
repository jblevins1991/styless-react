import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
    /**
     * UMD build.
     */
    {
        input: 'src/index.ts',
        output: {
            name: pkg.name,
            file: pkg.browser,
            format: 'umd',
            globals: {
                'react': 'React'
            }
        },
        plugins: [
            typescript(),
            resolve(),
            commonjs()
        ]
    },
    /**
     * CommonJS and ES build.
     */
    {
        input: 'src/index.ts',
        external: ['react', 'react-dom'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ],
        plugins: [
            typescript(),
            resolve(),
            commonjs()
        ]
    },
    /**
     * Typescript Types
     */
    {
        input: "./src/index.ts",
        output: [{
            file: pkg.types,
            format: "es"
        }],
        plugins: [
            dts()
        ]
    }
]