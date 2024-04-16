import {
    NormalizedPluginConfig,
    PluginConfig,
    PublishResponse,
    PublishResponseContext
} from './types.js';
import { publish as jsrPublish } from 'jsr';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { VerifyReleaseContext, VerifyConditionsContext } from 'semantic-release';

export async function parseConfig (config: PluginConfig): Promise<NormalizedPluginConfig> {
    const cwd = config.cwd || process.cwd();

    let pkgJsonPath: string | null = config.pkgJsonPath || join(cwd, 'package.json');
    if (!config.pkgJsonPath && !existsSync(pkgJsonPath)) {
        pkgJsonPath = null;
    }

    let name: string | undefined;
    const versionJsonPaths: string[] = [];
    const jsrJsonPath = join(cwd, 'jsr.json');
    const denoJsonPath = join(cwd, 'deno.json');
    if (existsSync(jsrJsonPath)) {
        versionJsonPaths.push(jsrJsonPath);
    }
    if (existsSync(denoJsonPath)) {
        versionJsonPaths.push(denoJsonPath);
    }
    if (pkgJsonPath) {
        versionJsonPaths.push(pkgJsonPath);
    }

    for(const path of versionJsonPaths) {
        const content = await readFile(path, 'utf8');
        const json = JSON.parse(content);
        if (!name && json.name) {
            name = json.name;
        }
    }
    if (!name) {
        throw new Error('No name found in jsr.json or deno.json');
    }

    return {
        cwd,
        name,
        prepare: {
            versionJsonPaths
        },
        publish: {
            binFolder: tmpdir(),
            pkgJsonPath: pkgJsonPath,
            publishArgs: config.publishArgs || []
        }
    };
}

export async function updateVersionJson (file: string, context: VerifyReleaseContext) {
    if (!context.nextRelease) {
        return;
    }

    context.logger.log(`Updating version in ${file}`);
    const content = await readFile(file, 'utf8');
    const json = JSON.parse(content);
    if (json.version === context.nextRelease.version) {
        context.logger.log(`Skipped, ${file} is already up to date`);
        return;
    }

    json.version = context.nextRelease.version;
    await writeFile(file, JSON.stringify(json, null, 2));
    context.logger.log(`Wrote new version to ${file}`);
}

export async function publish (config: NormalizedPluginConfig, context: VerifyConditionsContext): Promise<void> {
    context.logger.log(`Run jsr publish in ${config.cwd} with ${JSON.stringify(config.publish)}`);
    await jsrPublish(config.cwd, config.publish);
}

export function generatePublishResponse (config: NormalizedPluginConfig, context: PublishResponseContext): PublishResponse {
    let url = `https://jsr.io/${config.name}/versions`;
    if (context.nextRelease) {
        url = `https://jsr.io/${config.name}@${context.nextRelease.version}`;
    }

    return {
        name: 'JSR.io',
        url
    };
}
