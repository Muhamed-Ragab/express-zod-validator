# **express-zod-validator**

🚀 **Type-Safe Express Validation Middleware with Zod**

[![npm version](https://img.shields.io/npm/v/express-zod-validator.svg?style=flat-square)](https://www.npmjs.com/package/express-zod-validator)  
[![License](https://img.shields.io/npm/l/express-zod-validator.svg?style=flat-square)](https://github.com/Muhamed-Ragab/express-zod-validator/blob/main/LICENSE)  
[![Node.js Version](https://img.shields.io/node/v/express-zod-validator.svg?style=flat-square)](https://nodejs.org/)

## **✨ Features**

✔️ **Schema Validation for `body`, `params`, and `query`** using [Zod](https://zod.dev/)  
✔️ **Automatic Type Inference** for request data  
✔️ **No Need to Manually Type Express Request Handlers**  
✔️ **Seamless Integration with Express v5+**  
✔️ **Built-in Error Handling** for cleaner responses

## **📦 Installation**

```sh
npm install express-zod-validator zod
```

or

```sh
bun add express-zod-validator zod
```

## **🚀 Usage**

### **1️⃣ Basic Example**

```ts
import express from "express";
import { z } from "zod";
import { validator } from "express-zod-validator";
import type {
  TypedRequestHandler,
  ZodRequestSchema,
} from "express-zod-validator";
import errorHandler from "./middlewares/error-handler.middleware"; // Import your error handler

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const createUserSchema = {
  body: z.object({
    name: z.string(),
    age: z.number().min(18),
  }),
} satisfies ZodRequestSchema;

const createUserHandler: TypedRequestHandler<typeof createUserSchema> = async (
  req,
  res
) => {
  const { body } = req;
  res.status(201).json({ message: "User created!", body });
};

app.post("/users", validator(createUserSchema), createUserHandler);

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

### **2️⃣ Using an External Handler**

You can use the validation middleware with external route handlers:

```ts
// handlers/user.handler.ts
import type { TypedRequestHandler } from "express-zod-validator";

const createUserHandler: TypedRequestHandler<typeof createUserSchema> = async (
  req,
  res
) => {
  res.status(201).json({ message: "User created!", body: req.body });
};

export default createUserHandler;
```

Then, use it in your routes:

```ts
import express from "express";
import { validator } from "express-zod-validator";
import createUserHandler from "./handlers/user.handler";
import { createUserSchema } from "./schemas/user.schema";

const router = express.Router();

router.post("/users", validator(createUserSchema), createUserHandler);

export default router;
```

---

### **3️⃣ Built-in Error Handling**

The middleware automatically throws validation errors. You can use this example error handler:

```ts
import type { ErrorRequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { z } from "zod";

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) return;

  if (error instanceof z.ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.issues.map((err) => `${err.path} ${err.message}`)[0],
      errorCode: ReasonPhrases.BAD_REQUEST,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
    errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
```

---

## **🎯 Why Use express-zod-validator?**

✅ **Type-Safe Requests** – No more guessing request data types!  
✅ **Simplified Validation** – Easily define and reuse schemas.  
✅ **Better DX (Developer Experience)** – Fully typed request handlers.  
✅ **Automatic Error Handling** – No need to manually validate requests.

---

## **📜 License**

This project is licensed under the **MIT License**.

---

## **🌟 Contributing**

Contributions are welcome! Feel free to submit issues or pull requests on [GitHub](https://github.com/Muhamed-Ragab/express-zod-validator).

---

## **📬 Connect With Me**

🔗 GitHub: [Muhamed-Ragab](https://github.com/Muhamed-Ragab)  
🔗 LinkedIn: [Mohamed Ragab](https://www.linkedin.com/in/mohamed-ragab-5257121a6/)
