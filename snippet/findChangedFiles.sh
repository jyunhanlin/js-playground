#!/bin/sh

git fetch --no-tags --depth=1 origin main
# get the source of base branch
git checkout origin/main
# back to the merge commit
git checkout current_branch_sha

CHANGED_FILES="$(git diff --name-only origin/main --diff-filter=ACM '*.js' '*.jsx' | tr '\n' ' ')"

if [ -z "$CHANGED_FILES" ]; then
  echo -e 'No related tests found.'
else
  npm test -- --findRelatedTests $CHANGED_FILES
fi
