import { z } from 'zod';
import { init } from '.';

const app = init();

const paramsSchema = z.object({
  id: z.coerce.number(),
});

const bodySchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
});

app.input(paramsSchema).get('/todo/:id', async (req, res) => {
  res.status(200).json({
    success: true,
    body: req.body,
    params: req.params,
  });
});

app.input(paramsSchema, bodySchema).post('/todo/:id', async (req, res) => {
  res.json({
    success: true,
    body: req.body,
    params: req.params,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
