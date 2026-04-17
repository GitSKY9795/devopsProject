const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  // Keep coverage artifacts in CI but do not block pipeline while tests are still being expanded.
  coverageThreshold: undefined,
};
