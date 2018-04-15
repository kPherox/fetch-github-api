# fetch-github-api
[![License][license-badge]](LICENSE)
[![npm version][npm-version-badge]][npm-version]
![code size][code-size-badge]
[![Dependencies Status][david-dm-badge]][david-dm]
[![DevDependencies Status][david-dm-dev-badge]][david-dm-dev]
[![Master Build Status][travis-ci-master-badge]][travis-ci]
[![Develop Build Status][travis-ci-develop-badge]][travis-ci]
[![Maintainability Status][codeclimate-maintainability-badge]][codeclimate-maintainability]

[npm-version]: https://www.npmjs.com/package/fetch-github-api
[david-dm]: https://david-dm.org/kPherox/fetch-github-api
[david-dm-dev]: https://david-dm.org/kPherox/fetch-github-api?type=dev
[travis-ci]: https://travis-ci.org/kPherox/fetch-github-api
[codeclimate-maintainability]: https://codeclimate.com/github/kPherox/fetch-github-api/maintainability

[license-badge]: https://img.shields.io/npm/l/fetch-github-api.svg
[npm-version-badge]: https://img.shields.io/npm/v/fetch-github-api.svg
[code-size-badge]: https://img.shields.io/github/languages/code-size/kPherox/fetch-github-api.svg
[david-dm-badge]: https://img.shields.io/david/kPherox/fetch-github-api.svg
[david-dm-dev-badge]: https://img.shields.io/david/dev/kPherox/fetch-github-api.svg
[travis-ci-master-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/master.svg
[travis-ci-develop-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/develop.svg?label=develop%20build
[codeclimate-maintainability-badge]: https://img.shields.io/codeclimate/maintainability-percentage/kPherox/fetch-github-api.svg

Fetch json of all pages for GitHub api.
Just passing an API endpoint makes it easy to retrieve all the data.

## Requirements
- Node.js version 8.x or later.
- Support fetch/promiss/URL browser.

## Installation
Install from npm.
` npm i -s fetch-github-api `

## How to use
1. Require.
` const FetchGitHubApi = require('fetch-github-api'); `
if use ES6 import,
` import FetchGitHubApi = 'fetch-github-api' `
2. Initialize
` let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint'); `
3. Fetch json
```
// Get Json with then chain
fetchGitHubApi.fetchJson().then(json => {...});
// or async/await result
let json = await fetchGitHubApi.fetchJson();
```

## Options
constructor arguments.
| name | type | desc |
|:----:|:----:|:-----|
|endpoint|String|API endpoint.|
|params|Object<br/>(associative array)|GET query parameter. For example, when /users/:username/repos, {'sort':'updated'} etc.<br/>default: {}|
|max|Int|Max page number. If 0, all page.<br/>default: 0|
|per|Int|Per page number. If 0, api default `per_page`(30).<br/>default: 0|

