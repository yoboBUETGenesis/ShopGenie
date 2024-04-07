import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import type { RequestHandler } from '@sveltejs/kit';

dotenv.config();

const client = new QdrantClient({
    url: process.env.QDRANT_HOST,
    apiKey: process.env.QDRANT_API_KEY
});
const collectionName = "products";

export const POST = (async ({ request }) => {
    const data = await request.json()
    const img_emd = data["image_embeddings"]

    const list = await client.search(collectionName, {
        vector: {
            name: "image",
            vector: img_emd,
        },
        limit: 20,
        with_payload: true,
        with_vector: false,
    });

    return new Response(
		JSON.stringify({
			list: list
		})
	);
}) satisfies RequestHandler;