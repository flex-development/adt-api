#!/bin/bash

# Vercel Ignored Build Step
# If the following workflow exists with "0", the build will be skipped.
# If a code "1" or greater is returned, then a new deployment will be built.
# See: https://vercel.com/docs/platform/projects#ignored-build-step

# Get number of commits to check for initial commit
HEAD_COMMIT_COUNT=$(git rev-list --count HEAD)

if [[ $HEAD_COMMIT_COUNT == 1 ]]; then
  exit 1
else
  git diff HEAD^ HEAD --quiet api lib public scripts/ignored-build-step.sh package.json tsconfig.json vercel.json yarn.lock
fi
