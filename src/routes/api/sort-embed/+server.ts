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

async function create_embedding(query: string, combined_result: String) {
    const prompt = "The original query was: " + query + ". Vector database returned the following products\n" + combined_result + "\nReturn the most relevant products that go woth the qwery";
    const response = await openai
        .completions.create({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            temperature: 0.1,
            max_tokens: 5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

    return response.choices[0].text;
}

export const POST = (async ({ request }) => {
    // console.log("Ami Khujtesi", process.env.OPENAI_KEY_2);
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
