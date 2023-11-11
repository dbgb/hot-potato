# 🔥🥔 Hot Potato! <!-- omit in toc -->

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dbgb/hot-potato/blob/master/README.md)
[![built with: gatsby](https://img.shields.io/badge/built_with-Gatsby-blueviolet?&style=flat)](https://www.gatsbyjs.com)
[![style: styled-components](https://img.shields.io/badge/styling-%F0%9F%92%85%20styled--components-orange.svg?colorB=hotpink&style=flat)](https://github.com/styled-components/styled-components)

## _A cookbook app to make working with static recipe files quick and convenient._<!-- omit in toc -->

### Contents

- [🔎 Overview](#-overview)
- [🥘 Demo](#-demo)
- [🚀 Stack information](#-stack-information)
- [🔨 Build information](#-build-information)

## 🔎 Overview

- Display
  - Recipe view compiled from Markdown to HTML at build time
  - Dark Mode: Flicker-free and SSR-compatible
  - Self-Hosted Fonts: Improved visual load times; available even when offline
- Navigate
  - A11y friendly: built with keyboard navigation and screen readers in mind
  - Recipe Quicklist: store and conveniently switch between recipes on the fly
- Search
  - Instant search results from indexed file metadata
  - Toggleable keyword search for finding recipes with common ingredients
  - Filter recipes by category and status

## 🥘 Demo

- URL available on request (dbgb@duck.com)

## 🚀 Stack information

- Tech Stack
- Automated Test Suite
  - End-to-end tests
  - Integration tests
  - Unit tests

## 🔨 Build information

- When building the project, if
  `Error: error:0308010C:digital envelope routines::unsupported` is encountered:
  - This error is caused by a
    [breaking change](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)
    in the Node.js SSL provider in version 17+
  - Set Node to legacy LTS version 16.20.2 eg. `nvm use 16.20.2`
