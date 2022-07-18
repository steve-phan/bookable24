const { compilerOptions } = require("./tsconfig.json")
const { pathsToModuleNameMapper } = require("ts-jest")
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
})

module.exports = {
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: [`<rootDir>/setup-test-env.js`],
  transform: {
    // "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "ts-jest",
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
    // "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    ...paths,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|@hookform|firebase)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/src/tests/loadershim.js`],
}
