# fetch-github-api
[![License][license-badge]][LICENSE]
[![npm version][npm-version-badge]][npm-version]
![code size][code-size-badge]
[![Dependencies Status][david-dm-badge]][david-dm]
[![DevDependencies Status][david-dm-dev-badge]][david-dm-dev]  
[![Maintainability Status][codeclimate-maintainability-badge]][codeclimate]
[![Test Coverage Status][codeclimate-coverage-badge]][codeclimate-coverage]
[![Master Build Status][travis-ci-master-badge]][travis-ci]
[![Develop Build Status][travis-ci-develop-badge]][travis-ci]

[npm-version]: https://www.npmjs.com/package/fetch-github-api
[david-dm]: https://david-dm.org/kPherox/fetch-github-api
[david-dm-dev]: https://david-dm.org/kPherox/fetch-github-api?type=dev
[travis-ci]: https://travis-ci.org/kPherox/fetch-github-api
[codeclimate]: https://codeclimate.com/github/kPherox/fetch-github-api
[codeclimate-coverage]: https://codeclimate.com/github/kPherox/fetch-github-api/code

[license-badge]: https://img.shields.io/npm/l/fetch-github-api.svg
[npm-version-badge]: https://img.shields.io/npm/v/fetch-github-api.svg
[code-size-badge]: https://img.shields.io/github/languages/code-size/kPherox/fetch-github-api.svg
[david-dm-badge]: https://img.shields.io/david/kPherox/fetch-github-api.svg
[david-dm-dev-badge]: https://img.shields.io/david/dev/kPherox/fetch-github-api.svg

[codeclimate-maintainability-badge]: https://img.shields.io/codeclimate/maintainability-percentage/kPherox/fetch-github-api.svg
[codeclimate-coverage-badge]: https://img.shields.io/codeclimate/coverage/kPherox/fetch-github-api.svg
[travis-ci-master-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/master.svg
[travis-ci-develop-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/develop.svg?label=develop%20build

Fetch json of all pages for GitHub api.
Just passing an API endpoint makes it easy to retrieve all the data.

## Requirements
- Node.js version 8.x or later.
- Support fetch/promiss/URL browser.

## Installation
Install from npm.  
` npm i -s fetch-github-api `

## How to use
Use default export. Default is class. Pass endpoint to import class.
```
// import
import FetchGitHubApi from 'fetch-github-api'
// or require
const FetchGitHubApi = require('fetch-github-api');

// Initialize class
let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint');
// Support url query.
// let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint', {'per_page': 50});
// let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint', {}, 0, 50); // this is equivalent to the above code.

// Fetch json with then chain
fetchGitHubApi.fetchJson().then(json => {...});
// or async/await result
let json = await fetchGitHubApi.fetchJson();
```

## Options
constructor arguments.

| name | type | desc |
|:----:|:----:|:-----|
|endpoint|String|API endpoint.|
|params|Object<br/>(associative array)|GET query parameter.<br/>For example, when /users/:username/repos, {'sort':'updated'} etc.<br/>default: {}|
|max|Number<br/>(Integer)|Max page number.<br/>0 is all page.<br/>default: 0|
|per|Number<br/>(Integer)|Per page number.<br/>0 is API default (30). max 100<br/>default: 0|

## License
This software is released under the MIT License.
See the [LICENSE] file for more information.

### Include packages
See the [INCLUDE-LICENSE] file for information.

[LICENSE]: LICENSE
[INCLUDE-LICENSE]: INCLUDE-LICENSE

