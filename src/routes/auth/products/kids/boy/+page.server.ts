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




    let boyAll = {};

    let categories = ['boys fatua', 'boys pajama', 'boys panjabi-pajama-sets', 'boys panjabi',
        'boys pants', 'boys shirt-pant-sets', 'boys shirts', 'boys t-shirts-polos', 'boys gloves', 'boys jackets',
        'boys jeans', 'boys masks', 'boys polo t-shirts',
        'boys round neck & v neck t-shirts', 'boys shorts', 'boys suits & blazers',
        'boys sweatshirts', 'boys track pants', 'boys trousers']

    boyAll['panjabi'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys panjabi-pajama-sets', 'boys panjabi']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['t-shirt'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys t-shirts-polos', 'boys polo t-shirts', 'boys round neck & v neck t-shirts']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['formal'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys shirts', 'boys shirt-pant-sets']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['pant'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys pants', 'boys jeans', 'boys shorts']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['daily-life'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys track pants', 'boys fatua', 'boys pajama', 'boys trousers']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['Western'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys suits & blazers']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    boyAll['winter-wear'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['boys jackets', 'boys sweatshirts', 'boys gloves', 'boys masks',]
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });



    return { userNow, boyAll, itemCount };
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