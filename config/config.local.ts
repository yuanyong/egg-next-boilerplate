import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {
        logger: {
            level: 'DEBUG', // logs in all level will be written into files
            allowDebugAtProd: true,
        },
    };
    return config;
};
