import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '<Your key>';

    // add your egg config in here
    // config.middleware = [ 'nextRender' ];

    config.logger = {
        consoleLevel: 'DEBUG',
        level: 'DEBUG', // logs in all level will be written into files
        allowDebugAtProd: true,
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
    };
};
