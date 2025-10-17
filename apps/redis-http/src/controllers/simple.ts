import { Hono } from 'hono';
import { client } from '../config.ts';

export const simple = new Hono();

simple.post('/insert', async (c) => {
	const body = await c.req.json();
	const redisResponse = await client.append(body.key, body.value);

	return c.json({
		message: 'Success',
		status: c.res.status,
		response: redisResponse,
	});
});

simple.get('/get-simple', async (c) => {
	const keys = await client.keys('*'); // get all keys
	const lists = [];

	for (const key of keys) {
		// const type = await redis.type(key);
		// if (type === 'list') {
		lists.push(key);
		// }
	}

	const dbIndex = await client.call('CLIENT', 'INFO');
	// console.log(dbIndex);
	const redisInfo = await client.info();

	const info = await client.call('CONFIG', 'GET', 'bind');
	const port = await client.call('CONFIG', 'GET', 'port');
	return c.json({
		message: 'Done',
		status: c.res.status,
		response: lists,
		dbIndex,
		redisInfo,
		info,
		port,
	});
});
