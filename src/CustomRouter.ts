import * as express from "express";

export class CustomRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    /**
     * Register a route directly on the underlying Express router.
     * Routes are applied immediately when registered (no deferred applyRoutes call required).
     */
    public registerRoute(
        method: 'get' | 'post' | 'put' | 'delete' | 'patch',
        path: string,
        middlewares: express.RequestHandler[],
        handler: express.RequestHandler
    ) {
        // Use a typed any-index to call the framework-native method directly.
        (this.router as any)[method](path, ...middlewares, handler);
    }

    /**
     * Kept for backward compatibility. Previously routes were registered and then
     * applied via applyRoutes(); that is no longer necessary because registerRoute
     * attaches directly to the Express router. This method is a no-op.
     */
    public applyRoutes() {
        // No-op: routes are registered immediately in registerRoute.
        // Consider removing calls to applyRoutes() throughout the codebase.
    }
}
