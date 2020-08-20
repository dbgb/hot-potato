#!/bin/bash

RECIPES_SRC="/c/projects/recipes"
RECIPES_DEST="../recipes/"

# Copy recipes from source to local app recipe folder (retain date created)
cp -v "$RECIPES_SRC"/*.markdown "$RECIPES_DEST"

# Pipe null terminated stream of recipe names to frontmatter injection script
find "$RECIPES_DEST" -type f -name "*.markdown" -print0 | xargs -0 -I recipe ./prepend_frontmatter.sh recipe
