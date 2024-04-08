import type { RequestHandler } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'

dotenv.config();
const api_keys = [
    process.env.GOOGLE_API_KEY_1,
    process.env.GOOGLE_API_KEY_2,
    process.env.GOOGLE_API_KEY_3,
    process.env.GOOGLE_API_KEY_4,
    process.env.GOOGLE_API_KEY_5,
    process.env.GOOGLE_API_KEY_6,
    process.env.GOOGLE_API_KEY_7,
    process.env.GOOGLE_API_KEY_8,
    process.env.GOOGLE_API_KEY_9,
    process.env.GOOGLE_API_KEY_10,
    process.env.GOOGLE_API_KEY_11,
    process.env.GOOGLE_API_KEY_12,
    process.env.GOOGLE_API_KEY_13,
    process.env.GOOGLE_API_KEY_14,
    process.env.GOOGLE_API_KEY_15,
    process.env.GOOGLE_API_KEY_16,
]
function getKey() {
    // const time = new Date()
    // const minute = time.toString().split(':')[1]

    // let index = parseInt(minute)
    // index = index % api_keys.length
    // console.log(index)
    // return api_keys[index]
    return process.env.GOOGLE_API_KEY_2;
}


// const prompt = "What's different between these pictures?

// Converts image URL to a GoogleGenerativeAI.Part object.
async function urlToGenerativePart(url: string, mimeType: any) {
    const response = await fetch(url);
    const data = await response.buffer();
    return {
        inlineData: {
            data: data.toString('base64'),
            mimeType
        }
    };
}

async function run2(imageDescription: string, additional: string) {
    // For text-only input, use the gemini-pro model
    const api_key = getKey();
    const genAI = new GoogleGenerativeAI(api_key!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Following is a specification of a product " + imageDescription + ". I want a similar product with the following requirements " + additional + ". Now modify the given specification according to my requirement. You MUST maintain the format of the given specification. The format is $featurename is $featurevalue. Multiple features will be separated by full-stop."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return response.text();

}

async function run(imageLink: string) {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const api_key = getKey();
    const genAI = new GoogleGenerativeAI(api_key!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const prompt = "For the given product's image you need to generate a detailed specification including all relevant features like fabric, color, material fit and other essential features. You will format the specification as featurename is featurevalue. Multiple features will be separated by full-stop. For example following is a specification of a t-shirt: Colour is Orange. Fabric is Single Jersey Knit Cotton. Value Addition is Screen Print. Cut /Fit is Regular Fit. GSM is 180 Approx.. Collar/Neck is Round Neck. Sleeve is Half Sleeve. Care is Hand Wash With Mild Detergent In Cold Water";
    // const mimeType = getMimeType(imageLink);

    const imageParts = [
        await urlToGenerativePart(imageLink, "image/png"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text
}

export const POST = (async ({ request }) => {
    const formData = await request.formData();
    const imageLink = formData.get("imageLink") as string
    const additionalReq = formData.get("requirement") as string

    // console.log(imageLink);

    const description = await run(imageLink);
    const finalDescription = await run2(description, additionalReq);

    return new Response(
        JSON.stringify({
            description: finalDescription
        })
    );
}) satisfies RequestHandler;
