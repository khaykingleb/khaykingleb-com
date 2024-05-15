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
    "@semantic-release/release-notes-generator",
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
