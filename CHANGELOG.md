# Changelog
Changelog.

## [Unreleased]

## [Version 1.1.0][1.1.0] - 2018-04-23
### Added
- Add authorize header.
    - Support OAuth2 token (sent in a header).
    - Support Basic authenticate.
- Add x-github-otp header.
    - Support Two-Factor Authorize when basic authenticate.

## [Version 1.0.2][1.0.2] - 2018-04-18
### Changed
- Add check integer in constructor parameters.

### Fixed
- Fix did not fetch multiple pages when last is 19.

## [Version 1.0.1 (hotfix)][1.0.1] - 2018-04-16
### Fixed
- Fix `URL is not constructor` in browser.  
However, change module 'url' to 'universal-url' for `URL` and `URLSearchQuery`.

## [Version 1.0.0][1.0.0] - 2018-04-16
**Initial release.**
* Support GET api.
* Async fetch.

[Unreleased]: https://github.com/kPherox/fetch-github-api/compare/1.1.0...develop
[1.1.0]: https://github.com/kPherox/fetch-github-api/compare/1.0.2...1.1.0
[1.0.2]: https://github.com/kPherox/fetch-github-api/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/kPherox/fetch-github-api/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/kPherox/fetch-github-api/compare/01dd3c9...1.0.0

