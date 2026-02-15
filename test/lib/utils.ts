'use strict';

import * as assert from 'node:assert';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
    generatePublishResponse,
    type NormalizedPluginConfig,
    parseConfig,
    type PublishResponseContext,
    removeTemporaryBinFolder,
    updateVersionJson,
} from '../../src/index.ts';

describe('Utils', function () {
    describe('parseConfig()', function () {
        describe('should work for this project', async function () {
            const result = await parseConfig({});

            assert.ok(result.cwd);
            assert.strictEqual(result.name, '@sebbo2002/semantic-release-jsr');
            assert.deepStrictEqual(result.prepare, {
                versionJsonPaths: [result.cwd + '/package.json'],
            });

            assert.ok(typeof result.publish, 'object');
            assert.strictEqual(
                result.publish.pkgJsonPath,
                result.cwd + '/package.json',
            );
            assert.deepStrictEqual(result.publish.publishArgs, [
                '--allow-dirty',
            ]);

            await removeTemporaryBinFolder();
        });
    });
    describe('generatePublishResponse()', function () {
        it('should work with release', function () {
            const config: NormalizedPluginConfig = {
                cwd: process.cwd(),
                name: '@sebbo2002/ical-generator',
                prepare: {
                    versionJsonPaths: [],
                },
                publish: {
                    binFolder: '',
                    canary: false,
                    pkgJsonPath: '',
                    publishArgs: [],
                },
            };
            const context: PublishResponseContext = {
                nextRelease: {
                    channel: '',
                    gitHead: '',
                    gitTag: 'v1.2.3',
                    name: 'v1.2.3',
                    notes: '# [1.2.3](…)',
                    type: 'patch',
                    version: '1.2.3',
                },
            };

            const response = generatePublishResponse(config, context);
            assert.deepStrictEqual(response, {
                name: 'JSR.io',
                url: 'https://jsr.io/@sebbo2002/ical-generator@1.2.3',
            });
        });
        it('should work without release', function () {
            const config: NormalizedPluginConfig = {
                cwd: process.cwd(),
                name: '@sebbo2002/ical-generator',
                prepare: {
                    versionJsonPaths: [],
                },
                publish: {
                    binFolder: '',
                    canary: false,
                    pkgJsonPath: '',
                    publishArgs: [],
                },
            };
            const context: PublishResponseContext = {};

            const response = generatePublishResponse(config, context);
            assert.deepStrictEqual(response, {
                name: 'JSR.io',
                url: 'https://jsr.io/@sebbo2002/ical-generator/versions',
            });
        });
    });
    describe('updateVersionJson()', async function () {
        let tmpDir: string;
        let filePath: string;

        beforeEach(async () => {
            tmpDir = await mkdtemp(join(tmpdir(), 'semantic-release-jsr-'));
            filePath = join(tmpDir, 'package.json');
        });

        afterEach(async () => {
            await rm(tmpDir, { force: true, recursive: true });
        });

        describe('different version', function () {
            it('should update version if they are different', async function () {
                const mockFile = '{ "version": "1.2.3" }';

                await writeFile(filePath, mockFile, 'utf8');

                const context = {
                    logger: {
                        log: () => {},
                    },
                    nextRelease: {
                        version: '1.2.4',
                    },
                } as never;

                await updateVersionJson(filePath, context);
                const updatedFile = await readFile(filePath, 'utf8');

                assert.strictEqual(updatedFile, '{ "version": "1.2.4" }');
            });

            it('should update version if they are different (no whitespace)', async function () {
                const mockFile = '{"version":"1.2.3"}';

                await writeFile(filePath, mockFile, 'utf8');

                const context = {
                    logger: {
                        log: () => {},
                    },
                    nextRelease: {
                        version: '1.2.4',
                    },
                } as never;

                await updateVersionJson(filePath, context);
                const updatedFile = await readFile(filePath, 'utf8');

                assert.strictEqual(updatedFile, '{"version":"1.2.4"}');
            });

            it('should update version if they are different (mixed whitespace)', async function () {
                const mockFile = '{"version"   :"1.2.3"   }';

                await writeFile(filePath, mockFile, 'utf8');

                const context = {
                    logger: {
                        log: () => {},
                    },
                    nextRelease: {
                        version: '1.2.4',
                    },
                } as never;

                await updateVersionJson(filePath, context);
                const updatedFile = await readFile(filePath, 'utf8');

                assert.strictEqual(updatedFile, '{"version"   :"1.2.4"   }');
            });

            it('should update version if they are different (beta version)', async function () {
                const mockFile = '{ "version": "1.2.3-beta.3" }';

                await writeFile(filePath, mockFile, 'utf8');

                const context = {
                    logger: {
                        log: () => {},
                    },
                    nextRelease: {
                        version: '1.2.3-beta.4',
                    },
                } as never;

                await updateVersionJson(filePath, context);
                const updatedFile = await readFile(filePath, 'utf8');

                assert.strictEqual(
                    updatedFile,
                    '{ "version": "1.2.3-beta.4" }',
                );
            });
        });
        describe('same version', function () {
            it('should skip when version is already up to date', async function () {
                const mockFile = '{ "version": "1.2.3" }';

                await writeFile(filePath, mockFile, 'utf8');

                let matched = false;
                const context = {
                    logger: {
                        log: (msg?: unknown) => {
                            if (typeof msg === 'string') {
                                const match = msg.match(
                                    /Skipped, (.+) is already up to date/,
                                );
                                if (match) {
                                    assert.strictEqual(match[1], filePath);
                                    matched = true;
                                }
                            }
                        },
                    },
                    nextRelease: {
                        version: '1.2.3',
                    },
                } as never;

                await updateVersionJson(filePath, context);
                const updatedFile = await readFile(filePath, 'utf8');

                assert.strictEqual(updatedFile, mockFile);
                assert.ok(matched);
            });
        });

        it('should throw an error if the version could not be replaced', async function () {
            const mockFile = '{}';
            await writeFile(filePath, mockFile, 'utf8');

            const context = {
                logger: {
                    log: () => {},
                },
                nextRelease: {
                    version: '1.2.3',
                },
            } as never;

            await assert.rejects(
                updateVersionJson(filePath, context),
                /Failed to replace version in/,
            );
        });
    });
});
