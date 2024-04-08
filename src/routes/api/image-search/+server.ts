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
    const formData = await request.formData();
    console.log(formData.get("imageLink"))

    const ret = await fetch('https://image-embed-server.onrender.com/image-embed', {
        method: 'POST',
        body: formData
    });

    const res = await ret.json();
    const img_emd = res['image_embeddings'];
    // console.log(img_emd)
    const list = await client.search(collectionName, {
        vector: {
            name: "image",
            vector: img_emd,
        },
        limit: 25,
        with_payload: true,
        with_vector: false,
    });

    return new Response(
        JSON.stringify({
            list: list
        })
    );
}) satisfies RequestHandler;