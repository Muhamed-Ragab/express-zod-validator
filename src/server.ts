import express from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import {
  validator,
  errorHandler,
  type TypedRequestHandler,
  type ZodRequestSchema,
} from "./middlewares";

const app = express();
const PORT = Bun.env.PORT ?? 3000;

app.use(express.json());

const createUserSchema = {
  body: z.object({
    name: z.string(),
  }),
} satisfies ZodRequestSchema;

const createUserHandler: TypedRequestHandler<typeof createUserSchema> = async (
  req,
  res
) => {
  const { body, params, query } = req;

  res.status(StatusCodes.CREATED).json({ body, params, query });
};

app.post("/users", validator(createUserSchema), createUserHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
