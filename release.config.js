/** @type {import('semantic-release').GlobalConfig} */
export default {
  branches: ["master"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {
            message: "*",
            release: "patch",
          },
          {
            message: "feat:*",
            release: "minor",
          },
          {
            message: "BREAKING CHANGE:*",
            release: "major",
          },
          {
            message: "feat!:*",
            release: "major",
          },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        presetConfig: {
          header: "CHANGELOG",
          types: [
            {
              message: "feat:*",
              section: "Features",
            },
            {
              message: "BREAKING CHANGE:*",
              section: "Breaking Changes",
            },
            {
              message: "feat!:*",
              section: "Breaking Changes",
            },
            {
              message: "fix:*",
              section: "Bug Fixes",
            },
            {
              message: "perf:*",
              section: "Performance Improvements",
            },
            {
              message: "revert:*",
              section: "Reverts",
            },
            {
              message: "docs:*",
              section: "Documentation",
            },
            {
              message: "style:*",
              section: "Styles",
            },
            {
              message: "refactor:*",
              section: "Code Refactoring",
            },
            {
              message: "test:*",
              section: "Tests",
            },
            {
              message: "build:*",
              section: "Build System",
            },
            {
              message: "ci:*",
              section: "CI/CD",
            },
            {
              message: "chore:*",
              section: "Chores",
            },
          ],
        },
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "echo ${nextRelease.version} > .version",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", ".version"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
