// // rollup.config.js
// // import { terser } from "rollup-plugin-terser";
// import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
// import typescript from "@rollup/plugin-typescript";
// import sourceMaps from "rollup-plugin-sourcemaps";
// import commonjs from "@rollup/plugin-commonjs";
// // import serve from "rollup-plugin-serve";

// export default {
//     input: "./src/index.ts",
//     plugins: [
//         typescript({
//             exclude: "node_modules/**",
//             typescript: require("typescript"),
//         }),
//         sourceMaps(),
//         // serve({
//         //     port: 8888,
//         //     contentBase: "", // 表示起的服务是在根目录下
//         //     openPage: "/example/index.html", // 打开的是哪个文件
//         //     open: true, // 默认打开浏览器
//         // }),
//         commonjs(),
//     ],
//     // cjs: module.exports
//     // esm: export default
//     output: [
//         {
//             format: "cjs",
//             file: `dist/TDesignTool.cjs.js`,
//             sourcemap: false, // ts中的sourcemap也得变为true
//         },
//         {
//             format: "esm",
//             file: `dist/TDesignTool.esm.js`,
//             sourcemap: false,
//         },
//     ],
// };
// // export default [
// //     // {
// //     //     input: "./src/index.ts",
// //     //     output: {
// //     //         format: "cjs",
// //     //         file: `dist/${setting.packageName}`,
// //     //     },
// //     //     plugins: [nodeResolve(), commonjs(), typescript()],
// //     // },
// //     {
// //         input: "./src/index.ts",
// //         output: {
// //             format: "esm",
// //             file: `dist/TDesignTool.esm.js`,
// //         },
// //         plugins: [
// //             nodeResolve({
// //                 extensions: [".js", ".ts"],
// //             }),
// //             // commonjs(),
// //             typescript(),
// //         ],
// //     },
// // ];

// // 引入node中的核心模块，文件处理以及路径处理
// // import fs from "fs";
// // import path from "path";
// // const setting = require("./setting");

// // // 构建打包
// // const buildTsUtils = require("./build");
// // import buildTsUtils from "./build/index";

// // export default {
// //   input: "./src/index.js",
// //   output: {
// //     file: `${setting.tsUtils}/${setting.packageName}`,
// //     format: "cjs",
// //   },
// //   plugins: [
// //     terser({ compress: { drop_console: true } }),
// //     // buildTsUtils({
// //     //   path: "./dist",
// //     // }),
// //   ],
// // };
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { terser } from "rollup-plugin-terser"; // 读取 package.json 配置
import pkg from "./package.json"; // 当前运行环境，可通过 cross-env 命令行设置
const env = process.env.NODE_ENV; // umd 模式的编译结果文件输出的全局变量名称
const name = "RollupTsTemplate";
const config = {
    // 入口文件，src/index.ts
    input: path.resolve(__dirname, "src/index.ts"),
    // 输出文件
    output: [
        // commonjs
        {
            // package.json 配置的 main 属性
            file: pkg.main,
            format: "cjs",
        },
        // es module
        {
            // package.json 配置的 module 属性
            file: pkg.module,
            format: "es",
        },
        // umd
        {
            // umd 导出文件的全局变量
            name,
            // package.json 配置的 umd 属性
            file: pkg.umd,
            format: "umd",
        },
    ],
    plugins: [
        // 解析第三方依赖
        resolve(),
        // 识别 commonjs 模式第三方依赖
        commonjs(),
        // rollup 编译 typescript
        rollupTypescript(),
        // babel 配置
        babel({
            // 编译库使用
            // runtime
            babelHelpers: "runtime",
            // 只转换源代码，不转换外部依赖
            exclude: "node_modules/**",
            // babel 默认不支持 ts 需要手动添加
            extensions: [...DEFAULT_EXTENSIONS, ".ts"],
        }),
    ],
};
// 若打包正式环境，压缩代码
if (env === "production") {
    config.plugins.push(
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        })
    );
}

export default config;
