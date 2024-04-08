import * as dotenv from 'dotenv';
import { OPENAI_KEY_2 } from '$env/static/private'
import OpenAI from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import type { RequestHandler } from '@sveltejs/kit';
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'

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
    const prompt = "The original query was: " + query + ". Vector database returned the following products\n" + combined_result + "\nReturn  a list of ids if the corresponding item relevant to the query. Only return the list. You MUST return the list only and Not a single additional token. Make sure the list size is strictly less than 10. Ensure that the list is ordered based on the degree of similarity. For Example: a result can be like this: [5, 0, 6, 8, 10, 12, 2, 5, 4]. you MUST return only the list and nothing else";
    // const response = await openai
    //     .completions.create({
    //         model: "gpt-3.5-turbo-0125",
    //         prompt: prompt,
    //         temperature: 0.4,
    //         max_tokens: 200,
    //         top_p: 1,
    //         frequency_penalty: 0.5,
    //         presence_penalty: 0,
    //     })
    // const response = await openai.chatCompletions.create({
    //     model: "gpt-3.5-turbo-0125",
    //     messages: [{
    //         role: "system",
    //         content: "I will be given A query and search result from Vector database. I will list the most relevant product Ids that fo with the query"
    //     }, {
    //         role: "user",
    //         content: prompt
    //     }],
    //     temperature: 0.4,
    //     max_tokens: 200,
    //     top_p: 1,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0,
    // });
    // const chatRequestOpts: CreateChatCompletionRequest = {
    //     model: 'gpt-3.5-turbo',
    //     messages: [{
    //         role: "system",
    //         content: "I will be given A query and search result from Vector database. I will list the most relevant product Ids that fo with the query"
    //     }, {
    //         role: "user",
    //         content: prompt
    //     }],
    //     temperature: 0.4,
    //     max_tokens: 200,
    //     top_p: 1,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0,
    // }

    // const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    //     headers: {
    //         Authorization: `Bearer ${OPENAI_KEY_2}`,
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(chatRequestOpts)
    // })

    // console.log(chatResponse.body);

    // const response = await openai
    //     .completions.create({
    //         model: "gpt-3.5-turbo-instruct",
    //         prompt: prompt,
    //         temperature: 0.3,
    //         max_tokens: 200,
    //         top_p: 1,
    //         frequency_penalty: 0.5,
    //         presence_penalty: 0,
    //     });
    // // console.log(response)
    // // const sentiment = response.choices[0].text;


    // // console.log("Backend: ", response.choices[0].text);
    // return response.choices[0].text;
    const response = await openai.completions.create({
        model: "gpt-4-1106-preview", // Specify the model here
        prompt: prompt,
        temperature: 0.2, // Adjust as needed for your use case
        max_tokens: 220,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    return response.choices[0].text;
}

export const POST = (async ({ request }) => {
    // console.log("Ami Khujtesi", process.env.OPENAI_KEY_2);
    const data = await request.json();
    const orginal_query = data['query'];
    const combined_result = data['text'];
    // console.log(text)
    const emd = await create_embedding(orginal_query, combined_result);
    // console.log(emd)
    console.log(emd);

    // console.log(list)
    return new Response(
        JSON.stringify({
            text: emd
        })
    );
}) satisfies RequestHandler;
