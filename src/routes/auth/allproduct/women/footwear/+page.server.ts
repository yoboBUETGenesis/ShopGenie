import type { Actions, PageServerLoad } from './$types';
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
let nextoffset;
// export const load = async ({ locals: { supabase, getSession } }) => {
//     const session = await getSession()

//     if (!session) {
//         throw redirect(303, '/')
//     }
//     const {
//         data: { user }
//     } = await supabase.auth.getUser();
//     // console.log(user);


//     let { data: userdetails, error: err } = await supabase
//         .from('userdetails')
//         .select("*")
//         .eq('email', user.email)
//     console.log(err);
//     userNow = userdetails[0];


//     let { data: cart, error: err2 } = await supabase
//         .from('cart')
//         .select("*")
//         .eq('uid', userNow.id)


//     let itemCount = cart?.length;


//     let items = await client.scroll(collectionName, {
//         filter: {
//             must: [
//                 {
//                     key: "Category",
//                     match: {
//                         "any": ['men new-arrivals']
//                     },
//                 },
//             ],
//         },
//         limit: 10,
//         with_payload: true,
//         with_vector: false,
//     });
//     nextoffset = items.next_page_offset;
//     // console.log(allproducts)

//     for (let i = 0; i < items.points.length; i++) {
//         allproducts.push(items.points[i]);
//     }

//     console.log(allproducts.length)




//     return { userNow, itemCount, allproducts, nextoffset };
// }


// // export const actions = {
// //     search: async (event) => {
// //         console.log("pial hala ")
// //         const formData = await event.request.formData();
// //         // let data = Object.fromEntries(formData.entries()) as any;

// //         let items = await client.scroll(collectionName, {
// //             filter: {
// //                 must: [
// //                     {
// //                         key: "Category",
// //                         match: {
// //                             "any": ['men new-arrivals']
// //                         },
// //                     },
// //                 ],
// //             },
// //             limit: 10,
// //             with_payload: true,
// //             with_vector: false,
// //             offset: nextoffset
// //         });
// //         nextoffset = items.next_page_offset;
// //         // console.log(allproducts)

// //         for (let i = 0; i < items.points.length; i++) {
// //             allproducts.push(items.points[i]);
// //         }

// //         // console.log(data);

// //         // const ret = await event.fetch('/api/request/search', {
// //         //     method: 'POST',
// //         //     body: JSON.stringify(data)
// //         // });

// //         // const res = await ret.json();

// //         return {
// //             success: 'search',
// //             loadResult: allproducts
// //         };
// //     }
// // } satisfies Actions;
// export const actions = {

//     LoadMore: async ({ locals: { supabase, getSession } }) => {
//         let items = await client.scroll(collectionName, {
//             filter: {
//                 must: [
//                     {
//                         key: "Category",
//                         match: {
//                             "any": ['men new-arrivals']
//                         },
//                     },
//                 ],
//             },
//             limit: 10,
//             with_payload: true,
//             with_vector: false,
//             offset: nextoffset
//         });
//         nextoffset = items.next_page_offset;

//         // loadResult = items.points

//         return {
//             loadResult: items.points
//         };

//     },

// }



export const load: PageServerLoad = async ({ locals: { supabase }, fetch }) => {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);

    userNow = userdetails[0];


    let { data: cart, error: err2 } = await supabase
        .from('cart')
        .select('pid')
        .eq('uid', userNow.id)

    let cartitems = [];
    for (let i = 0; i < cart?.length; i++) {
        cartitems.push(cart[i].pid)
    }
    console.log(cartitems)
    let itemCount = cart?.length;
    let items = await client.scroll(collectionName, {
        filter: {
            must: [
                {
                    key: "Category",
                    match: {
                        "any": ['women canvas', 'women heels', 'women footwear']
                    },
                },
            ],
        },
        limit: 10,
        with_payload: true,
        with_vector: false,
    });
    nextoffset = items.next_page_offset;
    let allproducts = [];

    for (let i = 0; i < items.points.length; i++) {
        allproducts.push(items.points[i]);
    }

    return {
        userNow: userNow,
        allproducts: allproducts,
        cartitems: cartitems
    };
};

export const actions = {
    search: async (event) => {
        const formData = await event.request.formData();
        let data = Object.fromEntries(formData.entries()) as any;

        let items = await client.scroll(collectionName, {
            filter: {
                must: [
                    {
                        key: "Category",
                        match: {
                            "any": ['women canvas', 'women heels', 'women footwear']
                        },
                    },
                ],
            },
            limit: 10,
            with_payload: true,
            with_vector: false,
            offset: nextoffset
        });
        nextoffset = items.next_page_offset;
        let loadProducts = [];

        for (let i = 0; i < items.points.length; i++) {
            loadProducts.push(items.points[i]);
        }
        console.log(loadProducts);

        return {
            success: 'loadmore',
            loadProducts: loadProducts
        };
    }
} satisfies Actions;