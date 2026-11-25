import type { PublishOptions } from 'jsr';
import type { NextRelease } from 'semantic-release';

export interface NormalizedPluginConfig {
    cwd: string;
    name: string;
    prepare: {
        versionJsonPaths: string[];
    };
    publish: PublishOptions;
}

export interface PluginConfig {
    /**
     * Allow `--allow-dirty` to be passed to `jsr publish`.
     * Defaults to `true`, as usually the version is bumped before publishing.
     * Set to `false` to prevent `--allow-dirty` from being passed.
     */
    allowDirty?: boolean;

    /**
     * Working directory given to `jsr publish`.
     * Defaults to current directory.
     */
    cwd?: string;

    /**
     * Path to package.json.
     * Defaults to `cwd` + `/package.json` if it exists.
     */
    pkgJsonPath?: string;

    /**
     * Additional arguments to pass to `jsr publish`.
     */
    publishArgs?: string[];
}

export interface PublishResponse {
    channel?: string;
    name: string;
    url?: string;
}
export interface PublishResponseContext {
    nextRelease?: NextRelease;
}
