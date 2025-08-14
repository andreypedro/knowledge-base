/** @type {import('jest').Config} */
module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lowdb|steno)"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/src/tests/**/*.test.ts"],
};
