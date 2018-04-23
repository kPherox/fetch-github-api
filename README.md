# fetch-github-api
[![License][license-badge]][LICENSE]
[![npm version][npm-version-badge]][npm-version]
![code size][code-size-badge]
[![Dependencies Status][david-dm-badge]][david-dm]
[![DevDependencies Status][david-dm-dev-badge]][david-dm-dev]  
[![Maintainability Status][codeclimate-badge]][codeclimate]
[![Test Coverage Status][codecov-badge]][codecov]
[![Master Build Status][travis-ci-master-badge]][travis-ci]
[![Develop Build Status][travis-ci-develop-badge]][travis-ci]

[npm-version]: https://www.npmjs.com/package/fetch-github-api
[david-dm]: https://david-dm.org/kPherox/fetch-github-api
[david-dm-dev]: https://david-dm.org/kPherox/fetch-github-api?type=dev
[travis-ci]: https://travis-ci.org/kPherox/fetch-github-api
[codeclimate]: https://codeclimate.com/github/kPherox/fetch-github-api
[codecov]: https://codecov.io/gh/kPherox/fetch-github-api

[license-badge]: https://img.shields.io/npm/l/fetch-github-api.svg?style=flat-square
[npm-version-badge]: https://img.shields.io/npm/v/fetch-github-api.svg?style=flat-square
[code-size-badge]: https://img.shields.io/github/languages/code-size/kPherox/fetch-github-api.svg?style=flat-square
[david-dm-badge]: https://img.shields.io/david/kPherox/fetch-github-api.svg?style=flat-square
[david-dm-dev-badge]: https://img.shields.io/david/dev/kPherox/fetch-github-api.svg?style=flat-square

[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability-percentage/kPherox/fetch-github-api.svg?style=flat-square
[codecov-badge]: https://img.shields.io/codecov/c/github/kPherox/fetch-github-api.svg?style=flat-square
[travis-ci-master-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/master.svg?style=flat-square
[travis-ci-develop-badge]: https://img.shields.io/travis/kPherox/fetch-github-api/develop.svg?style=flat-square&label=develop%20build

Fetch json of all pages for GitHub API.
Just passing an API endpoint makes it easy to retrieve all the data.

## Requirements
- Node.js version 8.x or later.
- Support Promiss/fetch/URL browser.

## Installation
Install from npm.  
` npm i fetch-github-api `

## How to use
Use default export. Default is class. Pass endpoint to import class.
```node
// Use require, import not test.
const FetchGitHubApi = require('fetch-github-api');

// Initialize class.
let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint');
// Support url query.
// let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint', {'per_page': 50});
// let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint', {}, 0, 50); // this is equivalent to the above code.

// Fetch json with then chain.
fetchGitHubApi.fetchJson().then(json => {...});
// or async/await result.
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

## Authenticate
This module supported Basic authenticate & OAuth2 token.

### Use OAuth2 token
#### Sent as a parameter
```node
// Add params option when initialize.
let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint', {'access_token': OAUTH-TOKEN});

// or set params property.
fetchGitHubApi.params = {'access_token': OAUTH-TOKEN};
```

#### Sent in a header
```node
let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint');

// Set accessToken property.
fetchGitHubApi.accessToken = OAUTH-TOKEN;
```

### Use Basic authenticate
```node
let fetchGitHubApi = new FetchGitHubApi('/path/to/endpoint');

// Set basicAuth property.
fetchGitHubApi.basicAuth = "username:password";

// or set username/password property.
fetchGitHubApi.username = "username";
fetchGitHubApi.password = "password";

// If two-factor authentication enabled, set otpToken property.
fetchGitHubApi.otpToken = 123456;
```

#### Check must OTP code
```diff
 // If must OTP code, catch http error
+let checkMustOtpCode = err => {
+        if (err.name !== 'HTTPStatusError') {
+            throw err;
+        }
+
+        let errMsg = JSON.parse(err.message)
+          , resMsg = errMsg['data']['message'];
+
+        if (resMsg !== 'Must specify two-factor authentication OTP code.') {
+            throw err;
+        }
+
+        // Perform set otpToken property here.
+
+        // if browser, use prompt
+        let result
+          , inputValue = prompt("Please enter OTP code:", "")
+          , value = Number(inputValue);
+        while (Number.isNaN(value)) {
+            inputValue = prompt("Please enter OTP code:", "");
+            value = Number(inputValue);
+            if (!Number.isNaN(value)) {
+                result = value;
+                break;
+            }
+        }
+        fetchGitHubApi.otpToken = result;
+
+        return fetchGitHubApi.fetchJson().catch(checkMustOtpCode);
+    }
+
 fetchGitHubApi.fetchJson()
+    .catch(checkMustOtpCode)
     .then(json => {...})
```

## License
This module is released under the MIT License.
See the [LICENSE] file for more information.

### Include packages
See the [INCLUDE-LICENSE] file for information.

[LICENSE]: LICENSE
[INCLUDE-LICENSE]: INCLUDE-LICENSE

