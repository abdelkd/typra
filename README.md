# typra

a type-safe express.js wrapper with validations. inspired by TRPC.

# Why

Don't get me wrong, I love Express.js and it is a great library, it is simple yet powerful and it'd be perfect if it had type safety and validation by default. Well, no need anymore.

# Installation

```shell
npm i typra zod
```

# How to use

The library exposes `init` function that returns application object similar to calling `express()`. You can call it and start using it like you use express with only one difference.

The application object that's returned by `init` exposes to functions, `input` and `listen` the latter is self explanatory. `input` takes to arguments which are zod schemas, params and body schemas. In the case of non existent data or to ignore validation (eg: body of a get request) you can pass either `z.object({})` or emit it like in the example below.

`get`, `post`, `put`, `patch`, `delete` functions are all exposed by `input`

```typescript
import { init } from 'typra';
import { z } from 'zod';

const app = init();

app
  .input(
    z.object({
      id: z.coerce.number(),
    }),
  )
  .get('/user/:id', async (req, res) => {
    res.json({
      id: req.params.id, // IDE completion
    });
  });

app.listen(3000, () => {
  console.log('server is successfully running');
});
```

Note: if the field is supposed to be a number you have to always define the field as `z.coerce.number()`. Using `z.number()` will always make schema fail.
