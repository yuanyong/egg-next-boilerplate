import { Application, IBoot } from 'egg';

export default class ApplicationHook implements IBoot {

    private readonly app: Application;

    constructor(app: Application) {
        this.app = app;
        // this.app.config.coreMiddleware.unshift('nextRender');
    }

    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }

    configDidLoad() {
        // Config, plugin files have loaded.
    }

    async didLoad() {
        // All files have loaded, start plugin here.
    }

    async willReady() {
        // All plugins have started, can do some thing before app ready.
        this.app.logger.info('Next is preparing...');
        await this.app.next.prepare();
        this.app.logger.info('Next get prepared');
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
    }

    async serverDidReady() {
        // Server is listening.
    }

    async beforeClose() {
        // Do some thing before app close.
    }
}
