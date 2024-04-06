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




    let girlAll = {};

    let categories = ['girls frocks', 'girls ghagra-choli', 'girls shalwar-kameez', 'girls shawls',
        'girls skirts', 'girls sweaters-jackets', 'girls tops', 'girls dungarees',
        'girls frocks & dresses', 'girls leggings & jeggings', 'girls sweaters',
        'girls tops & t-shirts']

    girlAll['Special'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['girls ghagra-choli', 'girls shalwar-kameez',]
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    girlAll['winterwear'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['girls sweaters', 'girls shawls', 'girls sweaters-jackets',]
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    girlAll['daily_life'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['girls frocks', 'girls dungarees',
                            'girls frocks & dresses', 'girls leggings & jeggings']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });
    girlAll['casual'] = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['girls tops', 'girls skirts', 'girls tops & t-shirts']
                    },
                },
            ],
        },
        limit: 3,
        with_payload: true,
        with_vector: false,
    });




    return { userNow, girlAll, itemCount };
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