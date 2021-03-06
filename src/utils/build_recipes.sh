#!/bin/bash
# - - - - - - - - - - - - - - -
#
# Build script for embedding YAML metadata to Markdown files
#
# - - - - - - - - - - - - - - -

RECIPES_SRC="/c/projects/recipes"
RECIPES_DEST="../recipes"

# Keep recipes in sync with source
mkdir -p $RECIPES_DEST
rm $RECIPES_DEST/*.markdown

# Copy recipes from source to local app recipe folder (retain date created)
printf "%s\n" "Copying recipes from $RECIPES_SRC to $RECIPES_DEST..."
cp -v "$RECIPES_SRC"/*.markdown "$RECIPES_DEST"

# Pipe null terminated stream of recipe names to frontmatter injection script
find "$RECIPES_DEST" -type f -name "*.markdown" -print0 | xargs -0 -I recipe ./prepend_frontmatter.sh recipe

printf "\n%s\n\n" "Recipe files updated."
printf "%s\n\n" "INFO: Run 'yarn build' to update the search index!"
