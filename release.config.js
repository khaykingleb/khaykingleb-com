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
        preset: "conventionalcommits",
        presetConfig: {
          header: "CHANGELOG",
          types: [
            {
              type: "feat",
              section: "Features",
              hidden: false,
            },
            {
              type: "BREAKING CHANGE",
              section: "Breaking Changes",
              hidden: false,
            },
            {
              type: "feat!",
              section: "Breaking Changes",
              hidden: false,
            },
            {
              type: "fix",
              section: "Bug Fixes",
              hidden: false,
            },
            {
              type: "perf",
              section: "Performance Improvements",
              hidden: false,
            },
            {
              type: "revert",
              hidden: true,
            },
            {
              type: "docs",
              hidden: true,
            },
            {
              type: "style:*",
              hidden: true,
            },
            {
              type: "test",
              section: "Tests",
              hidden: false,
            },
            {
              type: "build",
              section: "Build System",
              hidden: false,
            },
            {
              type: "ci",
              section: "CI/CD",
              hidden: false,
            },
            {
              type: "chore",
              section: "Chores",
              hidden: false,
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
