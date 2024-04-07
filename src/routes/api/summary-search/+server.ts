import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import type { RequestHandler } from '@sveltejs/kit';

dotenv.config();

const client = new QdrantClient({
	url: process.env.QDRANT_HOST,
	apiKey: process.env.QDRANT_API_KEY
});
const collectionName = 'products';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY_2 || ''
});

async function create_embedding(text: string) {
	const embedding = await openai.embeddings.create({
		model: 'text-embedding-3-small',
		input: text,
		encoding_format: 'float'
	});

	return embedding.data[0].embedding;
}

export const POST = (async ({ request }) => {
	const data = await request.json();
	const text = data['text'];
	// console.log(text)
	const emd = await create_embedding(text);
	// console.log(emd)
	const list = await client.search(collectionName, {
		vector: {
			name: 'summary',
			vector: emd
		},
		limit: 20,
		with_payload: true,
		with_vector: false
	});
	// console.log(list)
	return new Response(
		JSON.stringify({
			list: list
		})
	);
}) satisfies RequestHandler;
