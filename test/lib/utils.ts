'use strict';

import * as assert from 'node:assert';
import {
    generatePublishResponse,
    NormalizedPluginConfig,
    PublishResponseContext
} from '../../src/lib/index.js';

describe('Utils', function () {
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
