#!/bin/bash
# - - - - - - - - - - - - - - -
#
# Prepend YAML frontmatter to the Markdown file at the given path
#
# $1 -> Markdown file path
#
# - - - - - - - - - - - - - - -

if [[ $# -eq 0 ]]; then
  # echo No arguments supplied.
  exit 1
else
  FILE_NAME=$(basename "$1") # "category_recipe-name.markdown"
  echo Adding frontmatter to "$FILE_NAME"
fi

# -- Create metadata fields
# Field: title
TITLE=$(head -n 1 "$1") # "# Recipe Title"
TITLE=${TITLE#\# }      # "Recipe Title"

# Convert text containing " and ', or just ", into multiline folded YAML format
# ref: https://stackoverflow.com/a/3182519
if [[ $TITLE =~ \" || $TITLE =~ \" && $TITLE =~ \' ]]; then
  TITLE=">"$'\n '"${TITLE}"
fi

# Field: wip
WIP=false
if [[ $TITLE =~ \[WIP\] ]]; then
  WIP=true
fi

# Field: category
CATEGORY=${FILE_NAME%*_*} # "category"

# Field: slug
SLUG=${FILE_NAME%.markdown} # "category_recipe-name"
SLUG=${SLUG#*_*}            # "recipe_name"

# TBD Fields:
# DATE_MODIFIED= # stat/cname?
# TAGS= # Explode recipe name

# -- Compose frontmatter template
TEMPLATE="---
title: "$TITLE"
slug: "/$SLUG"
category: "$CATEGORY"
wip: "$WIP"
---
"

# -- Prepend frontmatter metadata to file
echo "$TEMPLATE" | cat - "$1" >tempfile && mv tempfile "$1"
