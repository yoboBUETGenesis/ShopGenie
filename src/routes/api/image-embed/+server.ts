import type { RequestHandler } from '@sveltejs/kit';

//Expection form-data with "image"
export const POST = (async ({ request }) => {
	const formData = await request.formData();

	const ret = await fetch('https://image-embed-server.onrender.com/image-embed', {
		method: 'POST',
		body: formData
	});
	const res = await ret.json();
	const img_emd = res['image_embedding'];

	return new Response(
		JSON.stringify({
			image_embedding: img_emd
		})
	);
}) satisfies RequestHandler;
