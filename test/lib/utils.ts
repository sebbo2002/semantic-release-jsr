'use strict';

import * as assert from 'node:assert';
import {
    generatePublishResponse,
    NormalizedPluginConfig, parseConfig,
    PublishResponseContext, removeTemporaryBinFolder
} from '../../src/index.ts';

describe('Utils', function () {
    describe('parseConfig()', function () {
        describe('should work for this project', async function () {
            const result = await parseConfig({});

            assert.ok(result.cwd);
            assert.strictEqual(result.name, '@sebbo2002/semantic-release-jsr');
            assert.deepStrictEqual(result.prepare, {
                versionJsonPaths: [ result.cwd + '/package.json' ]
            });

            assert.ok(typeof result.publish, 'object');
            assert.strictEqual(result.publish.pkgJsonPath, result.cwd + '/package.json');
            assert.deepStrictEqual(result.publish.publishArgs, [ '--allow-dirty' ]);

            await removeTemporaryBinFolder();
        });
    });
    describe('generatePublishResponse()', function () {
        it('should work with release', function () {
            const config: NormalizedPluginConfig = {
                cwd: process.cwd(),
                name: '@sebbo2002/ical-generator',
                prepare: {
                    versionJsonPaths: []
                },
                publish: {
                    binFolder: '',
                    pkgJsonPath: '',
                    publishArgs: []
                }
            };
            const context: PublishResponseContext = {
                nextRelease: {
                    version: '1.2.3',
                    gitTag: 'v1.2.3',
                    name: 'v1.2.3',
                    type: 'patch',
                    channel: '',
                    gitHead: '',
                    notes: '# [1.2.3](…)'
                }
            };

            const response = generatePublishResponse(config, context);
            assert.deepStrictEqual(response, {
                name: 'JSR.io',
                url: 'https://jsr.io/@sebbo2002/ical-generator@1.2.3'
            });
        });
        it('should work without release', function () {
            const config: NormalizedPluginConfig = {
                cwd: process.cwd(),
                name: '@sebbo2002/ical-generator',
                prepare: {
                    versionJsonPaths: []
                },
                publish: {
                    binFolder: '',
                    pkgJsonPath: '',
                    publishArgs: []
                }
            };
            const context: PublishResponseContext = {};

            const response = generatePublishResponse(config, context);
            assert.deepStrictEqual(response, {
                name: 'JSR.io',
                url: 'https://jsr.io/@sebbo2002/ical-generator/versions'
            });
        });
    });
});
