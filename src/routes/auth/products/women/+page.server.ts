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

let userNow;
export const load = async ({ locals: { supabase, getSession } }) => {
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


    let { data: cart, error: err2 } = await supabase
        .from('cart')
        .select("*")
        .eq('uid', userNow.id)


    let itemCount = cart?.length;




    let womenAll = {};

    let categories = ['women kurta', 'women new-arrivals', 'women nightwear', 'women panjabi',
        'women saree', 'women scarves', 'women shalwar-kameez', 'women shawls', 'women bags', 'women dresses', 'women footwear',
        'women jumpsuits', 'women leggings & jeggings', 'women skirts', 'women tops',
        'women tunics', 'women winterwear', 'women canvas', 'women heels',]

    womenAll['panjabi-kurta'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women kurta', 'women panjabi']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['Western'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women dresses', 'women nightwear']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['Bags'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women bags']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['winter_wear'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women winterwear', 'women shawls']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });


    womenAll['new_arrivals'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women new-arrivals']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['saree'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women saree']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['daily_life'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women jumpsuits', 'women leggings & jeggings', 'women tops',
                            'women tunics']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['casual'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women shalwar-kameez', 'women scarves', 'women skirts']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    womenAll['footwear'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women canvas', 'women heels','women footwear']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });


    return { userNow, womenAll, itemCount };
}

export const actions = {

    deleteCartItem: async ({ url, locals: { supabase, getSession } }) => {
        const productid = url.searchParams.get("id")


        if (!productid) {
            return fail(400, { message: "Invalid request" })
        }

        const { error: err } = await supabase
            .from('cart')
            .delete()
            .eq("pid", productid)
            .eq("uid", userNow.id)

        if (err) console.log(err)
        else throw redirect(303, '/auth/cart');

    },

}