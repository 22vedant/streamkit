import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings } from '@streamkit/shared/src/types/cashfree';
import { payments } from './routes/payments';
import { webhooks } from './routes/webhook';
import { logger } from 'hono/logger';

// import { images } from './routes/images';

// const app = new Hono<{ Bindings: Bindings }>();
const app = new Hono();

app.use('*', cors());
app.use(logger());
app.route('/payments', payments);
app.route('/webhooks', webhooks);
// app.route('/images', images);

app.get('/', (c) => {
	return c.text(`Hello Hono! Everything works`);
});

export default app;
