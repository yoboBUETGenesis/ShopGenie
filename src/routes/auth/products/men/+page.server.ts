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




    let menAll = {};

    let categories = ['men coaty', 'men fatua', 'men new-arrivals', 'men panjabi-pajama-sets',
        'men panjabi', 'men polos', 'men shirts', 'men short-kurta', 'men t-shirts', 'men blazers',
        'men casual shirts', 'men footwear', 'men formal shirts', 'men jeans',
        'men shorts', 'men suits', 'men track pants & joggers', 'men trousers',
        'men wallets', 'men boots', 'men canvas', 'men casual-shoes',
        'men formal-shoes', 'men sandals', 'men sports-sandals', 'men sports-shoes']

    menAll['new arrivals'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men new-arrivals']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });

    menAll['panjabi'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men panjabi-pajama-sets', 'men panjabi']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    menAll['shirts'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men shirts', 'men casual shirts', 'men formal shirts']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    menAll['t-shirts'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men t-shirts', 'men polos', 'men formal shirts']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    menAll['formal pant'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men jeans']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    console.log("ok so far");
    menAll['casual pant'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men shorts', 'men track pants & joggers', 'men trousers',]
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    menAll['suit'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men blazers', 'men suits']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    menAll['Coaty-Fatua'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men coaty', 'men short-kurta', 'men fatua']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });
    console.log("ok so far 333");



    menAll['wallets'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men wallets']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });

    menAll['Footwear'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['men boots', 'men canvas', 'men footwear', 'men casual-shoes',
                            'men formal-shoes', 'men sports-sandals', 'men sports-shoes']
                    },
                },
            ],
        },
        limit: 4,
        with_payload: true,
        with_vector: false,
    });






    return { userNow, menAll, itemCount };
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