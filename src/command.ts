import {
    type PluginConfig,
    type PublishResponse
} from './types.ts';
import {
    type FailContext,
    type PrepareContext,
    type PublishContext,
    type SuccessContext,
    type VerifyConditionsContext
} from 'semantic-release';
import {
    generatePublishResponse,
    parseConfig,
    publish as publishUtil,
    removeTemporaryBinFolder,
    updateVersionJson
} from './utils.ts';

export async function verifyConditions(pluginConfig: PluginConfig, context: VerifyConditionsContext): Promise<void> {
    const config = await parseConfig(pluginConfig);
    await publishUtil({
        ...config,
        publish: {
            ...config.publish,
            publishArgs: [
                ...config.publish.publishArgs,
                '--dry-run'
            ]
        }
    }, context);
}

export async function prepare(pluginConfig: PluginConfig, context: PrepareContext): Promise<void> {
    const config = await parseConfig(pluginConfig);

    for (const file of config.prepare.versionJsonPaths) {
        await updateVersionJson(file, context);
    }
}

export async function publish(pluginConfig: PluginConfig, context: PublishContext): Promise<boolean | PublishResponse> {
    const config = await parseConfig(pluginConfig);
    await publishUtil(config, context);
    return generatePublishResponse(config, context);
}

export async function success (pluginConfig: PluginConfig, context: SuccessContext) {
    context.logger.log('Removing temporary folder');
    await removeTemporaryBinFolder();
}

export async function fail (pluginConfig: PluginConfig, context: FailContext) {
    context.logger.log('Removing temporary folder');
    await removeTemporaryBinFolder();
}
