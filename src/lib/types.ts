import { PublishOptions } from 'jsr';
import { NextRelease } from 'semantic-release';

export interface PluginConfig {
    cwd?: string;
    pkgJsonPath?: string;
    publishArgs?: string[];
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
