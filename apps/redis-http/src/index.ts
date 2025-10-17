import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors';
import { simple } from './controllers/simple.ts';
import { app as handleStream } from './controllers/stream.ts';

type Bindings = {
	token: string;
};

const app = new Hono();
const token = 'cool';

app.use(
	'*',
	bearerAuth({
		token,
	})
);
app.use(cors());

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.route('/simple', simple);
app.route('/stream', handleStream);

serve(
	{
		fetch: app.fetch,
		port: 8080,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
