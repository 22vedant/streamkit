// // Access Key ID: `1b357c85e247936f30b1b75198887611`
// // - Secret Key ID: `6da43ce4b37a13a03fecac3dba012ee0b4cb24caa1a552c3d5fde40a8141a4a5`
// // - Url Endpoint: `https://52412383d053451e825574f438df58a0.r2.cloudflarestorage.com`
// // - Cloudflare API token value: `09mm0ZZ6o35vaQx2lQk7wJrWFTFwlqlKU2xukrbJ`
// import { Hono } from 'hono';
// import { s3 } from '../middleware/r2';
// import { createObject } from '../controllers/imageControllers';
// import { S3Client } from '@aws-sdk/client-s3';

// type AppEnv = {
// 	Variables: {
// 		s3: S3Client;
// 	};
// 	Bindings: {
// 		OLA_REGION: string;
// 		OLA_ACCESS_KEY: string;
// 		OLA_SECRET_KEY: string;
// 		OLA_BUCKET_NAME: string; // Must be consistent
// 	};
// };

// // export const images = new Hono<{
// // 	Bindings: AppEnv['Bindings'];
// // 	Variables: AppEnv['Variables'];
// // }>();
// export const images = new Hono<AppEnv>();

// images.use('*', s3);
// images.get('/', (c) => {
// 	return c.json({
// 		message: 'Hello burz',
// 	});
// });

// images.post('/upload', createObject);
