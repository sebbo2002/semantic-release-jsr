# semantic-release-jsr

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Small `semantic-release` plugin, which adjusts the version in the `jsr.json` file and executes 
`jsr publish` to publish the module on jsr.io as well.

## 🚨 This is still Work in Progress!

| Step               | Description                                     |
| ------------------ |-------------------------------------------------|
| `verifyConditions` | Runs `jsr publish --dry-run` to test your setup |
| `prepare`          | Update the `jsr.json` / `deno.json` files       |
| `publish`          | Run final `jsr publish` command                 |

## 📦 Install

```bash
$ npm install -D @sebbo2002/semantic-release-jsr
```

## 🔧 Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@sebbo2002/semantic-release-jsr"
  ]
}
```

Please do not forget to set the `id-token` permission in your GitHub action so that `jsr publish`
can access the OIDC ID token for authentication.


## 🙆🏼‍♂️ Copyright and license

Copyright (c) Sebastian Pekarek under the [MIT license](LICENSE).
