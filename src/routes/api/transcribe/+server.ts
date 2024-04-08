import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY_2 || ''
});

//Expection form-data with "audioFile"
export const POST = (async ({ request }) => {
	const formData = (await request.formData()) as any;
	const audioFile = formData.get('audioFile');
	console.log(audioFile);

	const transcription = await openai.audio.transcriptions.create({
		file: audioFile,
		model: 'whisper-1',
		response_format: 'text',
		language: 'en'
	});

	console.log(transcription);

	return new Response(
		JSON.stringify({
			text: transcription
		})
	);
}) satisfies RequestHandler;
