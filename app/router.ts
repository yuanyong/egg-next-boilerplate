import { Application, Context } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/api/', controller.home.index);

    // Handler the page render url with next.js
    router.get('*', async (ctx: Context) => {
        const handle = ctx.app.next.getRequestHandler();
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });
};
