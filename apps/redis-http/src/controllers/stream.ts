import { Hono } from 'hono';
import { client } from '../config.ts';
export const app = new Hono();

// adding to the stream
// /stream/add/dono:creatorname
app.post('/add/:key', async (c) => {
	const body = await c.req.json();
	const redisKey = c.req.param('key');
	console.log(body);

	try {
		const stringBody = JSON.stringify(body);
		const redisStreamAdd = await client.xadd(
			`${redisKey}`,
			'*',
			'data',
			stringBody
		);

		return c.json({
			key: redisKey,
			message: 'Added to stream',
			status: c.res.status,
			response: redisStreamAdd,
		});
	} catch (error: unknown) {
		throw new Error(`❌Error: ${error}`);
	}
});
