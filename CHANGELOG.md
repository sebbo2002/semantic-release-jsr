# 1.0.0 (2024-05-05)


### Bug Fixes

* **CI:** Fix DockerHub container release ([01b7534](https://github.com/sebbo2002/semantic-release-jsr/commit/01b753406d1f1ef24a949c7d7b946d99b779d013))
* Create a real tmp folder ([c83866f](https://github.com/sebbo2002/semantic-release-jsr/commit/c83866fccfcb4cb1f06327d781213ba1762aaced))
* Fix dist path ([ed15fde](https://github.com/sebbo2002/semantic-release-jsr/commit/ed15fde6884904fb8bae4f7a0e43e812b8d73c41))


### Build System

* Deprecate node.js 12 ([426588b](https://github.com/sebbo2002/semantic-release-jsr/commit/426588b4bb7bde2924bbc92006ca839e960872e1))
* Deprecate node.js v14 / v17 ([7a2de45](https://github.com/sebbo2002/semantic-release-jsr/commit/7a2de45c12f19a1ec441b3a004f4aa935efc197c))
* Native ESM support ([7b86a4f](https://github.com/sebbo2002/semantic-release-jsr/commit/7b86a4f1187c387a3a5792e1fb72d822b04e3631))


### chore

* Remove node.js 10 Support ([2b910c0](https://github.com/sebbo2002/semantic-release-jsr/commit/2b910c09bc8a41085fc4472159494d8738d5521e))


### Features

* add `allowDirty` flag ([f22b39a](https://github.com/sebbo2002/semantic-release-jsr/commit/f22b39a3c7eee6420a6c1464a77b74cd23340855))
* Clear temporary folder when done ([f5d8900](https://github.com/sebbo2002/semantic-release-jsr/commit/f5d89002e8061368ddce5f55abb311872fa63ec3))
* first commit ([7d28ffe](https://github.com/sebbo2002/semantic-release-jsr/commit/7d28ffe6dabe3de237134a69cf3b7c5f985c5756))
* Log publish error during development ([16139d5](https://github.com/sebbo2002/semantic-release-jsr/commit/16139d5b2125f866b07f09fb9be13b4697f418b5))


### BREAKING CHANGES

* The node.js versions v14 and v17 are no longer maintained and are therefore no longer supported. See https://nodejs.dev/en/about/releases/ for more details on node.js release cycles.
* From now on, only node.js ^14.8.0 || >=16.0.0 are supported
* Only Support for node.js ^12.20.0 || >=14.13.1
* Removed support for node.js v10
