import type { RequestHandler } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_1!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
const prompt = "What's different between these pictures?";

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

async function run(imageLink: string) {
	// For text-and-image input (multimodal), use the gemini-pro-vision model
	const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

	const prompt = "Describe?";

	const imageParts = [
		await urlToGenerativePart(imageLink, 'image/png'),
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

	// console.log(imageLink);

    const description = await run(imageLink)

	return new Response(
		JSON.stringify({
            description: description
		})
	);
}) satisfies RequestHandler;
