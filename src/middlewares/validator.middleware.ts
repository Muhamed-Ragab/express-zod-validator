import type { RequestHandler } from "express";
import { z, ZodSchema } from "zod";

export type ZodRequestSchema = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

type InferRequestType<T extends ZodSchema | undefined> = T extends ZodSchema
  ? z.infer<T>
  : unknown;

export type TypedRequestHandler<Req extends ZodRequestSchema> = RequestHandler<
  InferRequestType<Req["params"]>,
  {},
  InferRequestType<Req["body"]>,
  InferRequestType<Req["query"]>
>;

const isZodSchema = (schema: unknown): schema is ZodSchema =>
  !!schema && typeof (schema as ZodSchema).parseAsync === "function";

export const validator =
  <S extends ZodRequestSchema>({
    body,
    params,
    query,
  }: ZodRequestSchema): TypedRequestHandler<S> =>
  async (req, _, next) => {
    console.log(req.body);

    if (isZodSchema(body)) {
      req.body = await body.parseAsync(req.body);
    }
    if (isZodSchema(params)) {
      req.params = await params.parseAsync(req.params);
    }
    if (isZodSchema(query)) {
      req.query = await query.parseAsync(req.query);
    }

    next();
  };
