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

    // console.log(cartok, err2)

    // console.log(item)


    return { userNow, item, itemCount, cartok };
}
export const actions = {
    addtoCart: async ({ locals: { supabase, getSession } }) => {


        // console.log("form", umail, taskname, description, deadline, importancescale)

        const { data, error: err } = await supabase
            .from('cart')
            .insert([
                { uid: userNow.id, pid: prid },
            ])
            .select()

        if (err) console.log(err)

        else throw redirect(303, `/auth/productview/${prid}`);
    },

}