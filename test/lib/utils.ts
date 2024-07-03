'use strict';

import * as assert from 'node:assert';
import {
    generatePublishResponse,
    NormalizedPluginConfig, parseConfig,
    PublishResponseContext, removeTemporaryBinFolder,
    updateVersionJson
} from '../../src/index.ts';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

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
    describe("updateVersionJson()", function () {
        it("should update version if they are different", async function () {
            const tmpDir = await mkdtemp(
                join(tmpdir(), "semantic-release-jsr-"),
            );
            const filePath = join(tmpDir, "package.json");

            afterEach(async () => {
                await rm(tmpDir, { recursive: true, force: true });
            });

            const mockFile = `{ "version": "1.2.3" }`;

            await writeFile(filePath, mockFile, "utf8");

            const context = {
                nextRelease: {
                    version: "1.2.4",
                },
                logger: {
                    log: () => {},
                },
            } as never;

            await updateVersionJson(filePath, context);
            const updatedFile = await readFile(filePath, "utf8");

            assert.strictEqual(updatedFile, `{ "version": "1.2.4" }`);
        });

        it("should skip when version is already up to date", async function () {
            const tmpDir = await mkdtemp(
                join(tmpdir(), "semantic-release-jsr-"),
            );
            const filePath = join(tmpDir, "package.json");

            afterEach(async () => {
                await rm(tmpDir, { recursive: true, force: true });
            });

            const mockFile = `{ "version": "1.2.3" }`;

            await writeFile(filePath, mockFile, "utf8");

            let matched = false;
            const context = {
                nextRelease: {
                    version: "1.2.3",
                },
                logger: {
                    log: (msg?: any) => {
                        if (typeof msg === "string") {
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
            } as never;

            await updateVersionJson(filePath, context);
            const updatedFile = await readFile(filePath, "utf8");

            assert.strictEqual(updatedFile, mockFile);
            assert.ok(matched);
        });
    });
});
