#!/bin/bash
# - - - - - - - - - - - - - - -
#
# Prepend YAML frontmatter to the Markdown file at the given path
#
# $1 -> Markdown file path
#
# - - - - - - - - - - - - - - -

# -- Create metadata fields
# Title
TITLE=$(head -n 1 "$1") # "# Recipe Title"
TITLE=${TITLE#\# }      # "Recipe Title"
TITLE=${TITLE//\"/}     # Strip double quotes, if present
TITLE=${TITLE//\'/}     # Strip single quotes, if present

# Category
FILE_NAME=$(basename "$1") # "category_recipe-name.markdown"
CATEGORY=${FILE_NAME%*_*}  # "category"

# Slug
SLUG=${FILE_NAME%.markdown} # "category_recipe-name"
SLUG=${SLUG#*_*}            # "recipe_name"

# Other tags
# DATE_MODIFIED=
# TAGS=

# -- Compose frontmatter template
TEMPLATE="---
title: "$TITLE"
slug: "/$SLUG"
category: "$CATEGORY"
---
"

# -- Prepend frontmatter metadata to file
echo "$TEMPLATE" | cat - "$1" >tempfile && mv tempfile "$1"
