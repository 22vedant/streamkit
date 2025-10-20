import { Redis } from 'ioredis';

export const client = new Redis({
	host: '192.168.1.5',
	port: 6379,
});
