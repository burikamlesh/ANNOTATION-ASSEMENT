const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/mock-server/"],
};

// next/jest concatenates its own transformIgnorePatterns with ours rather than
// overriding, and its default pattern excludes ESM packages like react-markdown
// (and its unified/remark/hast dependency tree) from being transformed. Resolve
// next/jest's config first, then replace transformIgnorePatterns outright so
// those ESM packages actually get compiled for tests.
module.exports = async () => {
  const nextConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextConfig,
    transformIgnorePatterns: [
      "[\\\\/]node_modules[\\\\/](?!(react-markdown|remark|rehype|hast|mdast|micromark|unist|unified|vfile|estree|property-information|space-separated-tokens|comma-separated-tokens|character-entities|decode-named-character-reference|trim-lines|web-namespaces|zwitch|html-void-elements|stringify-entities|hastscript|devlop|dequal|bail|trough|is-plain-obj|longest-streak|ccount|escape-string-regexp|markdown-table|inline-style-parser|style-to-object|html-url-attributes|trim-trailing-lines|extend|pretty-bytes)[^\\\\/]*[\\\\/])",
    ],
  };
};
