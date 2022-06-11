// const { Config } = require("@jest/types")
import type { Config } from "@jest/types"
const { compilerOptions } = require("./tsconfig.json")
const { pathsToModuleNameMapper } = require("ts-jest/preprocessor")
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
})

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
}
export default config
module.exports = {
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: [`<rootDir>/tests/setup-test-env.js`],
  verbose: true,
  transform: {
    "^.+\\.jsx?$": `<rootDir>/tests/jest-preprocess.js`,
    // "^.+\\.jsx||.+\\.tsx?$": `ts-jest`,
    // "^.+\\.jsx?$": `ts-jest`,
  },
  preset: "ts-jest",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
    ...paths,
  },

  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/tests/loadershim.js`],
}

// const { compilerOptions } = require("./tsconfig.json")

// const { pathsToModuleNameMapper } = require("ts-jest/utils")

// const paths = pathsToModuleNameMapper(compilerOptions.paths, {
//   prefix: "<rootDir>/",
// })
// const { defaults } = require("jest-config")

// const config = {
//   verbose: true,
// }

// module.exports = config

// module.exports = {
//   moduleNameMapper: {
//     ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
//     ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
//     ...paths,
//   },
//   moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
//   testEnvironment: `jsdom`,
//   setupFilesAfterEnv: ["./setup-test-env.js"],
// }