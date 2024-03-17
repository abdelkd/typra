import express from 'express';
import { z } from 'zod';
import { TypedRouteHandler, ExtendedRequest } from './types/';

export const init = (generalOnError: (err: unknown) => void = () => {}) => {
  const app = express();

  app.use(express.json());

  const input = <Params extends z.ZodRawShape, Body extends z.ZodRawShape>(
    // @ts-expect-error
    paramsSchema?: z.ZodObject<Params> = z.object({}),
    // @ts-expect-error
    bodySchema?: z.ZodObject<Body> = z.object({}),
  ) => {
    const get: TypedRouteHandler<z.infer<typeof paramsSchema>, undefined> = (
      path,
      handler,
      onError,
    ) => {
      app.get(
        path,
        async (
          req: ExtendedRequest<
            z.infer<typeof paramsSchema>,
            z.infer<z.ZodUndefined>
          >,
          res,
        ) => {
          try {
            const parsedParams = paramsSchema.safeParse(req.params);
            if (!parsedParams.success) {
              throw new z.ZodError(parsedParams.error.errors);
            }

            req.params = parsedParams.data;

            await handler(req, res);
          } catch (error) {
            generalOnError(error);
            if (onError) {
              onError(error);
            }
          }
        },
      );
    };

    const post: TypedRouteHandler<
      z.infer<typeof paramsSchema>,
      z.infer<typeof bodySchema>
    > = (path, handler, onError) => {
      app.post(
        path,
        async (
          req: ExtendedRequest<
            z.infer<typeof paramsSchema>,
            z.infer<typeof bodySchema>
          >,
          res,
        ) => {
          try {
            const parsedParams = paramsSchema.safeParse(req.params);
            if (!parsedParams.success) {
              throw new z.ZodError(parsedParams.error.errors);
            }

            const parsedBody = bodySchema.safeParse(req.body);
            if (!parsedBody.success) {
              throw new z.ZodError(parsedBody.error.errors);
            }

            req.params = parsedParams.data;
            req.body = parsedBody.data;
            await handler(req, res);
          } catch (error) {
            generalOnError(error);
            if (onError) {
              onError(error);
            }
          }
        },
      );
    };

    const put: TypedRouteHandler<
      z.infer<typeof paramsSchema>,
      z.infer<typeof bodySchema>
    > = (path, handler, onError) => {
      app.put(
        path,
        async (
          req: ExtendedRequest<
            z.infer<typeof paramsSchema>,
            z.infer<typeof bodySchema>
          >,
          res,
        ) => {
          try {
            const parsedParams = paramsSchema.safeParse(req.params);
            if (!parsedParams.success) {
              throw new z.ZodError(parsedParams.error.errors);
            }

            const parsedBody = bodySchema.safeParse(req.body);
            if (!parsedBody.success) {
              throw new z.ZodError(parsedBody.error.errors);
            }

            req.params = parsedParams.data;
            req.body = parsedBody.data;
            await handler(req, res);
          } catch (error) {
            generalOnError(error);
            if (onError) {
              onError(error);
            }
          }
        },
      );
    };

    const patch: TypedRouteHandler<
      z.infer<typeof paramsSchema>,
      z.infer<typeof bodySchema>
    > = (path, handler, onError) => {
      app.patch(
        path,
        async (
          req: ExtendedRequest<
            z.infer<typeof paramsSchema>,
            z.infer<typeof bodySchema>
          >,
          res,
        ) => {
          try {
            const parsedParams = paramsSchema.safeParse(req.params);
            if (!parsedParams.success) {
              throw new z.ZodError(parsedParams.error.errors);
            }

            const parsedBody = bodySchema.safeParse(req.body);
            if (!parsedBody.success) {
              throw new z.ZodError(parsedBody.error.errors);
            }

            req.params = parsedParams.data;
            req.body = parsedBody.data;
            await handler(req, res);
          } catch (error) {
            generalOnError(error);
            if (onError) {
              onError(error);
            }
          }
        },
      );
    };

    const deleteMethod: TypedRouteHandler<
      z.infer<typeof paramsSchema>,
      undefined
    > = (path, handler, onError) => {
      app.delete(
        path,
        async (
          req: ExtendedRequest<
            z.infer<typeof paramsSchema>,
            z.infer<z.ZodUndefined>
          >,
          res,
        ) => {
          try {
            const parsedParams = paramsSchema.safeParse(req.params);
            if (!parsedParams.success) {
              throw new z.ZodError(parsedParams.error.errors);
            }

            req.params = parsedParams.data;
            await handler(req, res);
          } catch (error) {
            generalOnError(error);
            if (onError) {
              onError(error);
            }
          }
        },
      );
    };

    return {
      get,
      post,
      put,
      patch,
      delete: deleteMethod,
    };
  };

  const listen = (port: number, cb = () => {}) => {
    app.listen(port, cb);
  };

  return {
    input,
    listen,
  };
};
