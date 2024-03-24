module.exports = {
  // Enable after formatting all codes
  // "pre-commit": "pnpm exec lint-staged",
  "commit-msg": "pnpm exec tsx ./scripts/verify-commit.ts",
};
