import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings } from '@streamkit/shared/src/types/cashfree';
import { payments } from './routes/payments';
import { webhooks } from './routes/webhooks';
import { images } from './routes/images';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());
app.route('/payments', payments);
app.route('/webhooks', webhooks);
app.route('/images', images);

app.get('/', (c) => {
	return c.text('Hello Hono! Everything works');
});

export default app;
