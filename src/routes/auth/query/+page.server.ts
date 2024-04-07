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




    return { userNow, itemCount };
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
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        const imageBuffer = await newClass.image.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');

        const apiResponse = await fetch('https://api.deepinfra.com/v1/models/clip-ViT-B-32:predict', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer wqaVWgdvOcN2Wi2Y4tsev6AkbWDJvqgJ',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: [{
                    image: `data:image/jpeg;base64,${imageBase64}`,
                }],
                normalize: true,
            }),
        });

        console.log(apiResponse);
        // throw redirect(303, '/auth/query');
    },


}