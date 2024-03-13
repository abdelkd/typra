import { Request, Response } from 'express';

export interface ExtendedRequest<Params, Body>
  extends Request<Params, any, Body, Params> {}

export type TypedRouteHandler<ParamsSchema, BodySchema> = (
  path: string,
  handler: (
    req: ExtendedRequest<ParamsSchema, BodySchema>,
    res: Response,
  ) => Promise<void>,
  onError?: (error: unknown) => void,
) => void;
