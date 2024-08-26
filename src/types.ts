import { type PublishOptions } from 'jsr';
import { type NextRelease } from 'semantic-release';

export interface PluginConfig {
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

    /**
     * Allow `--allow-dirty` to be passed to `jsr publish`.
     * Defaults to `true`, as usually the version is bumped before publishing.
     * Set to `false` to prevent `--allow-dirty` from being passed.
     */
    allowDirty?: boolean;
}

export interface NormalizedPluginConfig {
    cwd: string;
    name: string;
    prepare: {
        versionJsonPaths: string[];
    };
    publish: PublishOptions;
}

export interface PublishResponseContext {
    nextRelease?: NextRelease;
}
export interface PublishResponse {
    name: string;
    url?: string;
    channel?: string;
}
