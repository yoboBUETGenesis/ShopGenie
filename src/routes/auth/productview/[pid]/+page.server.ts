import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import * as dotenv from 'dotenv'
import OpenAI from "openai";
import { QdrantClient } from '@qdrant/js-client-rest';
dotenv.config()

const client = new QdrantClient({
    url: process.env.QDRANT_HOST,
    apiKey: process.env.QDRANT_API_KEY,
});
const collectionName = "products"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY_1,
});

let userNow;
let prid;
export const load = async ({ params, locals: { supabase, getSession } }) => {
    const productid = parseInt(params.pid);
    prid = productid;
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    // console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];

    let { data: cart, error: err6 } = await supabase
        .from('cart')
        .select("*")
        .eq('uid', userNow.id)


    let itemCount = cart?.length;


    let items = await client.retrieve(collectionName, {
        ids: [productid],
        with_payload: true,
        with_vector: false,
    });

    let item = items[0];

    let { data: cartok, error: err2 } = await supabase
        .from('cart')
        .select("*")
        .eq('uid', userNow.id)
        .eq('pid', productid)

    let recommendation = await client.recommend(collectionName, {
        positive: [productid],
        using: "summary",
        params: {
            ef: 128
        },
        strategy: "best_score",
        limit: 3,
        with_payload: true,
        with_vector: false,
    });

    // console.log(recommendation);


    let { data: reviews, error: err7 } = await supabase
        .from('review')
        .select("*")
        .eq('pid', prid)

    // print(reviews)
    for (let i = 0; i < reviews?.length; i++) {
        let { data: userComment, error: err77 } = await supabase
            .from('userdetails')
            .select("*")
            .eq('id', reviews[i].uid)
        reviews[i].user = userComment[0];
    }
    let groupedReviews = {};


    reviews.forEach(currReview => {
        let sentiment = currReview.sentiment;
        console.log(currReview)
        if (!groupedReviews[sentiment]) {
            groupedReviews[sentiment] = [];
        }
        groupedReviews[sentiment].push(currReview);
    });


    // const groupedReviews = reviews.reduce((acc, review) => {
    //     const { sentiment } = review;
    //     acc[sentiment] = acc[sentiment] || [];
    //     acc[sentiment].push(review);
    //     return acc;
    // }, {});

    console.log(groupedReviews);


    return { userNow, item, itemCount, cartok, recommendation, groupedReviews };
}
export const actions = {
    addtoCart: async ({ url, locals: { supabase, getSession } }) => {

        const proid = url.searchParams.get("id")
        // console.log("form", umail, taskname, description, deadline, importancescale)

        const { data, error: err } = await supabase
            .from('cart')
            .insert([
                { uid: userNow.id, pid: proid },
            ])
            .select()

        if (err) console.log(err)

        else throw redirect(303, `/auth/productview/${proid}`);
    },
    review: async ({ url, request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        const proid = url.searchParams.get("id")
        //console.log("amar add class form holo", data);

        let newReview = Object.fromEntries(data.entries()) as any;
        const prompt = `Determine the sentiment of the following text: ${newReview.body}. Select whether positive, negative or neutral`;
        const response = await openai
            .completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                temperature: 0.1,
                max_tokens: 5,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
        // console.log(response)
        const sentiment = response.choices[0].text;
        const sentimentLowerCase = sentiment.toLowerCase();
        let result = '';
        if (sentimentLowerCase.includes("positive")) {
            result = "positive";
        } else if (sentimentLowerCase.includes("negative")) {
            result = "negative";
        } else {
            result = "neutral";
        }


        const { data: dtt, error: err } = await supabase
            .from('review')
            .insert([
                { uid: userNow.id, pid: proid, body: newReview.body, sentiment: result },
            ])
            .select()

        if (err) console.log(err)

        else throw redirect(303, `/auth/productview/${proid}`);

    },

}