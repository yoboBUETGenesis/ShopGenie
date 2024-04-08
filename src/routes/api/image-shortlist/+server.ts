// image-shortlist
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
    let items = [];
    // console.log(emd)
    const list1 = await client.search(collectionName, {
        vector: {
            name: 'summary',
            vector: emd
        },
        params: {
            ef: 128
        },
        limit: 5,
        with_payload: true,
        with_vector: false
    });
    for (let i = 0; i < list1.length; i++) {
        items.push(list1[i])
    }

    const list2 = await client.search(collectionName, {
        vector: {
            name: 'specifications',
            vector: emd
        },
        params: {
            ef: 128
        },
        limit: 25,
        with_payload: true,
        with_vector: false
    });
    for (let i = 0; i < list2.length; i++) {
        items.push(list2[i])
    }



    const itemsMap = new Map();
    items.forEach(item => {
        if (!itemsMap.has(item.id)) {
            itemsMap.set(item.id, item);
        }
    });

    // Convert Map back to array
    const uniqueItems = Array.from(itemsMap.values());
    items = uniqueItems;

    // console.log(list)
    return new Response(
        JSON.stringify({
            list: items
        })
    );
}) satisfies RequestHandler;
