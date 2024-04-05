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

    let searchList = [];
    let itemCount = cart?.length;
    for (let i = 0; i < itemCount; i++) {
        searchList.push(cart[i].pid)
    }

    let items = await client.retrieve(collectionName, {
        ids: searchList,
        with_payload: true,
        with_vector: false,
    });

    console.log("print")
    for (let i = 0; i < items.length; i++) {
        console.log(items[i])
    }




    return { userNow, items };
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