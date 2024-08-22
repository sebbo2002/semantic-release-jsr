# semantic-release-jsr

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Small `semantic-release` plugin, which adjusts the version in the `jsr.json` file and executes 
`jsr publish` to publish the module on jsr.io as well.

## 📦 Install

```bash
# Install via npm
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
can access the OIDC ID token for authentication. Optionally, some options can be passed to the 
plugin, which are documented [here](https://sebbo2002.github.io/semantic-release-jsr/develop/reference/interfaces/PluginConfig.html).


## ⚙️ Steps

| Step                 | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| `verifyConditions`   | Runs `jsr publish --dry-run` to test your setup. Also downloads the deno binary if required. |
| `prepare`            | Updates the `jsr.json` / `deno.json` files                                                   |
| `publish`            | Run final `jsr publish` command                                                              |
| `fail` / `success`   | Remove the temporary folder                                                                  |

## 🙆🏼‍♂️ Copyright and license

Copyright (c) Sebastian Pekarek under the [MIT license](LICENSE).
