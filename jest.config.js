module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/controllers/*.test.ts",
    "**/models/*.test.ts",
    "**/middleware/*.test.ts",
    "**/routes/*.test.ts",
    "**/*.test.ts",
  ],
};
