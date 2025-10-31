# [3.1.0](https://github.com/sebbo2002/semantic-release-jsr/compare/v3.0.1...v3.1.0) (2025-10-31)

### Bug Fixes

- Use cwd from context to support multi semantic release ([812e557](https://github.com/sebbo2002/semantic-release-jsr/commit/812e557db7f8745ef32afe9e9b876931f590663f)), closes [#85](https://github.com/sebbo2002/semantic-release-jsr/issues/85)

### Features

- Add additional info about dry run in verifyConditions step ([86558c1](https://github.com/sebbo2002/semantic-release-jsr/commit/86558c14395920f5631bc3154759dc47e3db4451))

## [3.0.1](https://github.com/sebbo2002/semantic-release-jsr/compare/v3.0.0...v3.0.1) (2025-07-22)

# [3.0.0](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.5...v3.0.0) (2025-05-12)

### chore

- Drop node v18 support ([3e18405](https://github.com/sebbo2002/semantic-release-jsr/commit/3e18405ac1e1be738a414623f97169c802567f99))

### BREAKING CHANGES

- Drop node.js v18 Support

This node.js version is no longer supported. For more information see https://nodejs.dev/en/about/releases/

## [2.0.5](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.4...v2.0.5) (2025-03-16)

## [2.0.4](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.3...v2.0.4) (2025-02-07)

## [2.0.3](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.2...v2.0.3) (2025-01-09)

### Bug Fixes

- **deps:** downgrade eslint to v9.13.0 to resolve typescript-eslint issue ([d4d3c58](https://github.com/sebbo2002/semantic-release-jsr/commit/d4d3c580323d3801f60e53dd61327758ff066418)), closes [#10353](https://github.com/sebbo2002/semantic-release-jsr/issues/10353) [typescript-eslint/typescript-eslint#10353](https://github.com/typescript-eslint/typescript-eslint/issues/10353)

## [2.0.2](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.1...v2.0.2) (2024-11-15)

## [2.0.1](https://github.com/sebbo2002/semantic-release-jsr/compare/v2.0.0...v2.0.1) (2024-10-08)

### Bug Fixes

- Fix type imports to fix semantic-release import ([259433e](https://github.com/sebbo2002/semantic-release-jsr/commit/259433ece8ac403b5a15d4c98e8635b511cd0d40))

# [2.0.0](https://github.com/sebbo2002/semantic-release-jsr/compare/v1.1.0...v2.0.0) (2024-08-26)

### chore

- Drop support for node.js v19 and v21 ([2fff079](https://github.com/sebbo2002/semantic-release-jsr/commit/2fff079040a377fbe9ecc340388f6a29b863cf80))

### BREAKING CHANGES

- Drop node.js v21 Support

These node.js versions are no longer supported. For more information see https://nodejs.dev/en/about/releases/

# [1.1.0](https://github.com/sebbo2002/semantic-release-jsr/compare/v1.0.1...v1.1.0) (2024-08-04)

### Bug Fixes

- make sure beta version values are also correctly parsed in `version` field ([4be02b6](https://github.com/sebbo2002/semantic-release-jsr/commit/4be02b6441f4eea198ae86cdd82174cc304de887)), closes [#13](https://github.com/sebbo2002/semantic-release-jsr/issues/13) [#13](https://github.com/sebbo2002/semantic-release-jsr/issues/13) [#15](https://github.com/sebbo2002/semantic-release-jsr/issues/15)

### Features

- Check if version was really changed in file ([59b7088](https://github.com/sebbo2002/semantic-release-jsr/commit/59b7088b5ad8120edf3679333661b9e490b6010b)), closes [#13](https://github.com/sebbo2002/semantic-release-jsr/issues/13)

## [1.0.1](https://github.com/sebbo2002/semantic-release-jsr/compare/v1.0.0...v1.0.1) (2024-07-16)

### Bug Fixes

- Do not overwrite whole file when updating version ([50d8e2d](https://github.com/sebbo2002/semantic-release-jsr/commit/50d8e2d38dd34325c7dfd0675869c883f7aefe59)), closes [#10](https://github.com/sebbo2002/semantic-release-jsr/issues/10)

# 1.0.0 (2024-05-05)

### Bug Fixes

- **CI:** Fix DockerHub container release ([01b7534](https://github.com/sebbo2002/semantic-release-jsr/commit/01b753406d1f1ef24a949c7d7b946d99b779d013))
- Create a real tmp folder ([c83866f](https://github.com/sebbo2002/semantic-release-jsr/commit/c83866fccfcb4cb1f06327d781213ba1762aaced))
- Fix dist path ([ed15fde](https://github.com/sebbo2002/semantic-release-jsr/commit/ed15fde6884904fb8bae4f7a0e43e812b8d73c41))

### Build System

- Deprecate node.js 12 ([426588b](https://github.com/sebbo2002/semantic-release-jsr/commit/426588b4bb7bde2924bbc92006ca839e960872e1))
- Deprecate node.js v14 / v17 ([7a2de45](https://github.com/sebbo2002/semantic-release-jsr/commit/7a2de45c12f19a1ec441b3a004f4aa935efc197c))
- Native ESM support ([7b86a4f](https://github.com/sebbo2002/semantic-release-jsr/commit/7b86a4f1187c387a3a5792e1fb72d822b04e3631))

### chore

- Remove node.js 10 Support ([2b910c0](https://github.com/sebbo2002/semantic-release-jsr/commit/2b910c09bc8a41085fc4472159494d8738d5521e))

### Features

- add `allowDirty` flag ([f22b39a](https://github.com/sebbo2002/semantic-release-jsr/commit/f22b39a3c7eee6420a6c1464a77b74cd23340855))
- Clear temporary folder when done ([f5d8900](https://github.com/sebbo2002/semantic-release-jsr/commit/f5d89002e8061368ddce5f55abb311872fa63ec3))
- first commit ([7d28ffe](https://github.com/sebbo2002/semantic-release-jsr/commit/7d28ffe6dabe3de237134a69cf3b7c5f985c5756))
- Log publish error during development ([16139d5](https://github.com/sebbo2002/semantic-release-jsr/commit/16139d5b2125f866b07f09fb9be13b4697f418b5))

### BREAKING CHANGES

- The node.js versions v14 and v17 are no longer maintained and are therefore no longer supported. See https://nodejs.dev/en/about/releases/ for more details on node.js release cycles.
- From now on, only node.js ^14.8.0 || >=16.0.0 are supported
- Only Support for node.js ^12.20.0 || >=14.13.1
- Removed support for node.js v10
