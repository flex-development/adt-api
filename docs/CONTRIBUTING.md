# Contributing

These instructions will help you begin making changes on your local machine, as
well as follow coding guidelines.

## Overview

[Getting Started](#getting-started)  
[Coding Standards](#coding-standards)  
[Integrations](#integrations)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Documentation](#documentation)  
[Getting Help](#getting-help)  
[Creating a Pull Request](#creating-a-pull-request)

## Getting Started

### Git Configuration

Copy the [starter Git global config](.gitconfig) to stay inline with our coding
guidelines, as well as begin extending your own workflow.

**Note**: The examples below will uses aliases from the starter config.

### Development Environment

1. Copy the snippet below to clone the project onto your local machine:

   ```zsh
   git clone https://github.com/flex-development/adt-api.git; cd adt-api
   yarn # or npm install
   ```

2. To finish configuring your Vercel development environment:

   ```zsh
   vc link;
   ```

   Be sure to select the `Flex Development` scope when prompted:

   ```zsh
   ? Set up “~/Projects/FLDV/adt-api”? [Y/n] y
   ? Which scope should contain your project? Flex Development
   ? Found project “flexdevelopment/adt-api”. Link to it? [Y/n] y
   ✅  Linked to flexdevelopment/adt-api (created .vercel)
   ```

3. Copy the resulting `project.json` to your home directory:

   ```zsh
   cp .vercel/project.json ~/.vercel/adt-api.json
   ```

4. Run the project!

   - `yarn dev`: Start development server on `process.env.PORT`

### Environment Variables

All required environment variables are documented in `package.json` under the
`required-env` field.

Vercel supports adding environment variables for Development, Preview, and
Production environments. A set of Vercel system environemnt variables can also
be exposed for each project.

For more information, see [Environment Variables][2] from the Vercel docs.

## Coding Standards

[Husky][3] is used to enforce coding and commit message standards.

## Branch Naming Conventions

When creating a new branch, the name should match the following format:
**`feat/`**, **`hotfix/`**, **`release/`**, or **`support/`** followed by
**`<branch_name>`**.

For example:

```zsh
  git feat repo-setup
```

will create a new branch titled `feat/repo-setup` and push it to `origin`.

### Commit Messages

This project follows [Conventional Commits][4] standards.

Commit messages should be one of the following types:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Changes that don't impact external users
- `docs`: Documentation only changes
- `feat`: New features
- `fix`: Bug fixes
- `perf`: Performance improvements
- `refactor`: Code improvements
- `revert`: Revert past changes
- `style`: Changes that do not affect the meaning of the code
- `test`: Adding missing tests or correcting existing tests
- `wip`: Working on changes, but you need to go to bed :wink:

For example:

```zsh
  git chore "add eslint configuration"
```

will produce the following commit: `chore: add eslint configuration`

[commitlint][5] is used to enforce commit guidlelines.

To review our commitlint rules, see the configuration file:

- [`commitlint.config.js`](../commitlint.config.js)

### Formatting & Linting

#### Formatting

This project uses [Prettier][6] to format all code.

To review our formatting guidelines, see our configuration files:

- Configuration:[`.prettierrc.js`](../.prettierrc.js)
- Ignore Patterns: [`.prettierignore`](../.prettierignore)

#### Linting

This project uses [ESLint][7] to lint JavaScript and TypeScript files.

To review our linting guidelines, see our configuration files:

- Configuration: [`.eslintrc.js`](../.eslintrc.js)
- Ignore Patterns: [`.eslintignore`](../.eslintignore)

## Integrations

### Google Analytics

[Google Analytics][8] is a web analytics service that tracks and reports website
traffic.

The ADT API uses the [Measurement Protocol for Universal Analytics][9] to track
API requests, success responses, and errors.

**Environment Variables**

- `GA_TRACKING_ID`
- `VERCEL_ENV`
- `VERCEL_GIT_COMMIT_REF`
- `VERCEL_GIT_COMMIT_SHA`

## Making Changes

### Endpoint

File: `api/index.ts`

### Library

Directory: `lib`

## Documentation

- JavaScript & TypeScript: [JSDoc][10]

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

## Testing

Directory: `__tests__`

This project uses [Jest][11] as its test runner. To run the tests in this
project, run `yarn test`.

Husky is configured to run tests before every push. If a bug report concerning a
failed test is needed, you'll be able to push your code even if a test fails.

## Getting Help

If you need help, make note of any issues in their respective files. Whenever
possible, create a test to reproduce the error. Make sure to label your issue as
`discussion`, `help wanted`, and/or `question`.

## Creating a Pull Request

When you're ready to have your changes reviewed, make sure your code is
[well documented](#documentation). The `pre-commit` and `pre-push` hooks will
test your changes against our coding guidelines, as well run all of the tests in
this project.

### Submit for Review

- Use [**this template**](./pull_request_template.md)
- Label your pull request appropriately
- Assign the task to yourself and the appropriate reviewer

[1]: https://lerna.js.org/
[2]: https://vercel.com/docs/environment-variables
[3]: https://github.com/typicode/husky
[4]: https://www.conventionalcommits.org/
[5]: https://github.com/conventional-changelog/commitlint
[6]: https://prettier.io/
[7]: https://eslint.org/
[8]: https://analytics.google.com/analytics/web/
[9]: https://developers.google.com/analytics/devguides/collection/protocol/v1
[10]: https://jsdoc.app
[11]: https://jestjs.io/
