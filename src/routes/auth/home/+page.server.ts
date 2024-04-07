;
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
    console.log(user);


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

    let searchList = [];
    let items;
    if (itemCount) {
        items = [];
        for (let i = 0; i < itemCount; i++) {
            // searchList.push(cart[i].pid)
            let tempo = await client.recommend(collectionName, {
                positive: [cart[i].pid],
                using: "summary",
                params: {
                    ef: 128
                },
                strategy: "average_vector",
                limit: 4,
                with_payload: true,
                with_vector: false,
            });
            for (let i = 0; i < tempo.length; i++) {
                items.push(tempo[i])
            }
        }
        const itemsMap = new Map();
        items.forEach(item => {
            if (!itemsMap.has(item.id)) {
                itemsMap.set(item.id, item);
            }
        });

        // Convert Map back to array
        const uniqueItems = Array.from(itemsMap.values());
        items = uniqueItems;

        //now remove duplicate json object from items

        console.log("Amar data");
    }
    else {

        if (userNow.gender === "Male") {
            searchList = [13051, 13052, 1446, 1447, 601, 602, 14969, 14970, 15698, 15699, 13856, 13857, 12069, 12070, 19811, 19812, 19451, 19452, 2400, 2401];
        }
        else {
            searchList = [6867, 6868, 9706, 9707, 6876, 6877, 11899, 11900, 16376, 16377, 15797, 15798, 4800, 4801, 17237, 17238, 9366, 9367, 19931, 19932];
        }
        items = await client.retrieve(collectionName, {
            ids: searchList,
            with_payload: true,
            with_vector: false,
        });
        console.log("dewa data");
    }




    return { userNow, itemCount, items };
}