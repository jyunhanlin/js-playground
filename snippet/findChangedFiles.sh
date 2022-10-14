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


touch test-log.txt 
touch test-error.txt
CHANGED_FILES="${{ steps.find-changed-files.outputs.changed_files }}"
if [[ "$CHANGED_FILES" == *src* ]]; then
  npm test -- --findRelatedTests $CHANGED_FILES > test-log.txt 2> test-error.txt || true
fi

TEST_LOG=`cat test-log.txt`
if [[ -z "$TEST_LOG" ]] || [[ "$TEST_LOG" == *"No tests found"* ]]; then
  echo -e 'No related tests found.' > test-log.txt
fi
