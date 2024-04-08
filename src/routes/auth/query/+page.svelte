<script lang="ts">
	import aarongimage from '$lib/images/Aarong Logo Vector.svg';
	import start from '$lib/images/start_rec.svg';
	import stop from '$lib/images/stop.svg';
	import stopdisabled from '$lib/images/stop_disabled.svg';
	import allen from '$lib/images/Allen.svg';
	import apex from '$lib/images/apex.png';
	import genie from '$lib/images/genie.png';
	import { enhance } from '$app/forms';
	import Themeswitcher from '$lib/themeswitcher.svelte';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';
	// import { Pulse } from 'svelte-loading-spinners';
	import { writable } from 'svelte/store';

	let recognizedSpeech = '';
	let audioURL = '';
	const hearingRunning = writable(false);
	let mediaRecorder: MediaRecorder | null = null;
	let audioBlob: Blob;
	let chunks: BlobPart[] = [];

	async function startRecording() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			console.error('Media Devices not supported');
			return;
		}

		hearingRunning.set(true);
		chunks = [];
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
			console.error('Failed to get user media', err);
			hearingRunning.set(false);
		});

		if (stream) {
			mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.ondataavailable = function (e) {
				chunks.push(e.data);
			};

			mediaRecorder.onstop = () => {
				audioBlob = new Blob(chunks, { type: 'audio/webm' });
				audioURL = URL.createObjectURL(audioBlob);
			};

			mediaRecorder.start();
		}
	}
	function stopRecording() {
		mediaRecorder?.stop();
		hearingRunning.set(false);
	}

	// let recognizedSpeech = '';
	// let hearingRunning = false;
	// let mediaRecorder: any;
	// let chunks: any[] = [];

	// function handleHearingStart() {
	// 	hearingRunning = true;
	// 	startRecording();
	// }

	// function handleHearingStop() {
	// 	stopRecording();
	// 	hearingRunning = false;
	// }
	// async function startRecording() {
	// 	chunks = [];
	// 	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	// 	mediaRecorder = new MediaRecorder(stream);

	// 	mediaRecorder.ondataavailable = function (e) {
	// 		chunks.push(e.data);
	// 	};

	// 	// mediaRecorder.onstop = async function () {
	// 	// const blob = await new Blob(chunks, { type: 'audio/mp3' });
	// 	// const recordedAudioFile = await new File([blob], 'recorded_audio.mp3', { type: 'audio/mp3' });
	// 	// console.log(recordedAudioFile)

	// 	// const formData = new FormData();
	// 	// formData.append('audioFile', recordedAudioFile);

	// 	// const ret = await fetch('/api/transcribe', {
	// 	// 	method: 'POST',
	// 	// 	body: formData
	// 	// });

	// 	// const res = await ret.json();
	// 	// recognizedSpeech = res['text'];

	// 	// chunks = [];
	// 	// };

	// 	mediaRecorder.start();
	// }

	// function stopRecording() {
	// 	mediaRecorder.stop();
	// }

	onMount(() => {});

	export let data;
	export let form;
	let { session, supabase, userNow, itemCount } = data;
	$: ({ session, supabase, userNow, itemCount } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	let image: any;
	let textquery: string = '';
	let audio;
	let showaddmodal = true;

	function addclassmodal() {
		showaddmodal = true;
	}

	function closeclassmodal() {
		showaddmodal = false;
	}

	function gotocart() {
		window.open('/auth/cart', '_self');
	}
	// $: {
	// 	if (form?.success === 'done') {
	// 		console.log(form.text);
	// 	}
	// 	form?.success = "";
	// }

	let searchResult: any = [];
	let context = '';
	let openAIresult = false;
	let openAIList: any = [];
	let showOpenAIResults = false;
	let textDoneSubmitted = false;

	async function textSubmit() {
		textDoneSubmitted = true;
		// console.log(textquery);
		// let payload = { text: textquery };
		// openAIresult = false;
		// // console.log(payload)
		// // console.log("Here")
		// const ret = await fetch('/api/summary-search', {
		// 	method: 'POST',
		// 	body: JSON.stringify(payload)
		// });
		// // console.log(ret)
		// const res = await ret.json();
		// console.log(res);
		// searchResult = res['list'];
		// context = '';
		// for (let i = 0; i < searchResult.length; i++) {
		// 	context += 'id: ';
		// 	context += searchResult[i].id;
		// 	context += '. Summary: This is a ';
		// 	context +=
		// 		searchResult[i].payload.Category +
		// 		' from ' +
		// 		searchResult[i].payload.Company +
		// 		'. It is a ' +
		// 		searchResult[i].payload.Name +
		// 		'. ' +
		// 		searchResult[i].payload.Description +
		// 		'. Price' +
		// 		searchResult[i].payload.Price;
		// 	context += '\n';
		// }
		// console.log(context);
		// let payload2 = { text: context, query: textquery };
		// // console.log(context)
		// const ret2 = await fetch('/api/sort-embed', {
		// 	method: 'POST',
		// 	body: JSON.stringify(payload2)
		// });
		// const res2 = await ret2.json();
		// console.log(res2['text']);
		// let strTmp = '';
		// let ok = false;
		// for (let i = 0; i < res2['text'].length; i++) {
		// 	if (res2['text'][i] == '[') {
		// 		ok = true;
		// 	} else if (res2['text'][i] == ']') {
		// 		strTmp += res2['text'][i];
		// 		ok = false;
		// 		break;
		// 	}
		// 	if (ok) {
		// 		strTmp += res2['text'][i];
		// 	}
		// }
		// const finlList = JSON.parse(strTmp);
		// // console.log(res2['text']);
		// let tempo = [];
		// for (let i = 0; i < finlList.length; i++) {
		// 	for (let j = 0; j < searchResult.length; j++) {
		// 		if (searchResult[j].id == finlList[i]) {
		// 			tempo.push(searchResult[j]);
		// 			break;
		// 		}
		// 	}
		// }
		// openAIList = tempo;
		// openAIresult = true;
		// // console.log("Here")
		// textquery = '';
	}

	let imageuploading = false;
	let imageUploaded = '';
	async function imageSubmit(event: Event) {
		const formData = new FormData(event.target as HTMLFormElement);
		let name = Date.now() + '_' + userNow.id;
		imageuploading = true;
		imageUploaded = false;
		await data.supabase.storage.from('imageqwery').upload(name, formData.get('image'), {
			cacheControl: '3600',
			upsert: false
		});

		const { data: link } = await supabase.storage.from('imageqwery').getPublicUrl(name);
		// console.log(link.publicUrl);
		imageUploaded = link.publicUrl;
		imageuploading = false;

		// formData.append('imageLink', link.publicUrl);
		// const ret = await fetch('/api/image-search', {
		// 	method: 'POST',
		// 	body: formData
		// });
		// const res = await ret.json();
		// searchResult = res['list'];

		// console.log(searchResult);

		// context = '';
		// for (let i = 0; i < searchResult.length; i++) {
		// 	context += 'id: ';
		// 	context += searchResult[i].id;
		// 	context += '. Summary: This is a ';
		// 	context +=
		// 		searchResult[i].payload.Category +
		// 		' from ' +
		// 		searchResult[i].payload.Company +
		// 		'. It is a ' +
		// 		searchResult[i].payload.Name +
		// 		'. ' +
		// 		searchResult[i].payload.Description +
		// 		'. Price' +
		// 		searchResult[i].payload.Price;
		// 	context += '\n';
		// }
		// console.log(context);
		// let payload2 = { text: context, query: textquery };
		// // console.log(context)

		// const ret2 = await fetch('/api/sort-embed', {
		// 	method: 'POST',
		// 	body: JSON.stringify(payload2)
		// });

		// const res2 = await ret2.json();
		// console.log(res2['text']);
		// let strTmp = '';
		// let ok = false;
		// for (let i = 0; i < res2['text'].length; i++) {
		// 	if (res2['text'][i] == '[') {
		// 		ok = true;
		// 	} else if (res2['text'][i] == ']') {
		// 		strTmp += res2['text'][i];
		// 		ok = false;
		// 		break;
		// 	}
		// 	if (ok) {
		// 		strTmp += res2['text'][i];
		// 	}
		// }
		// const finlList = JSON.parse(strTmp);
		// // console.log(res2['text']);
		// let tempo = [];
		// for (let i = 0; i < finlList.length; i++) {
		// 	for (let j = 0; j < searchResult.length; j++) {
		// 		if (searchResult[j].id == finlList[i]) {
		// 			tempo.push(searchResult[j]);
		// 			break;
		// 		}
		// 	}
		// }
		// openAIList = tempo;
		// openAIresult = true;
	}
	let submissionDone = false;
	let submissionDonButLoading = false;

	async function finalSubmit() {
		submissionDone = true;
		submissionDonButLoading = true;
		if (textquery.length > 0) {
			if (recognizedSpeech.length > 0 && image != null) {
				// text + audio + image
				const concatanated = textquery + ' ' + recognizedSpeech;
				const formData1 = new FormData();
				const formData2 = new FormData();

				// formData1.append('imageLink', imageUploaded);

				formData2.append('imageLink', imageUploaded);
				formData2.append('requirement', concatanated);
				// const ret = await fetch('/api/image-shortSearch', {
				// 	method: 'POST',
				// 	body: formData1
				// });
				// const res = await ret.json();
				// searchResult = res['list'];

				const ret_des = await fetch('/api/new-description', {
					method: 'POST',
					body: formData2
				});
				const res_des = await ret_des.json();

				const textPrompt = res_des['description'];
				console.log(textPrompt);
				// console.log(searchResult);

				let payload = { text: textPrompt };
				openAIresult = false;
				const retmod = await fetch('/api/summary-search', {
					method: 'POST',
					body: JSON.stringify(payload)
				});
				const resmod = await retmod.json();
				// console.log(res);
				searchResult = resmod['list'];
				submissionDonButLoading = false;

				// for (let i = 0; i < resmod['list'].length; i++) {
				// 	let existsm = false;
				// 	for (let j = 0; j < searchResult.length; j++) {
				// 		if (resmod['list'][i].id == searchResult[j].id) {
				// 			existsm = true;
				// 			break;
				// 		}
				// 	}
				// 	if (existsm == false) {
				// 		searchResult.push(resmod['list'][i]);
				// 	}
				// }

				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price +
						'. Specifications: ' +
						searchResult[i].payload.Specifications;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textPrompt };
				console.log(context);

				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});

				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;
			} else if (recognizedSpeech.length > 0) {
				//can be taken only text
				const concatanated = textquery + recognizedSpeech;
				let payload = { text: concatanated };
				openAIresult = false;
				const ret = await fetch('/api/summary-search', {
					method: 'POST',
					body: JSON.stringify(payload)
				});
				const res = await ret.json();
				console.log(res);
				searchResult = res['list'];
				submissionDonButLoading = false;
				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price +
						'. Specifications: ' +
						searchResult[i].payload.Specifications;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textquery };
				// console.log(context)
				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});
				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;

				// textquery = '';
				// recognizedSpeech = '';
			} else if (image != null) {
				//text + image
				const concatanated = textquery;
				const formData1 = new FormData();
				const formData2 = new FormData();

				// formData1.append('imageLink', imageUploaded);

				formData2.append('imageLink', imageUploaded);
				formData2.append('requirement', concatanated);
				// const ret = await fetch('/api/image-shortSearch', {
				// 	method: 'POST',
				// 	body: formData1
				// });
				// const res = await ret.json();
				// searchResult = res['list'];

				const ret_des = await fetch('/api/new-description', {
					method: 'POST',
					body: formData2
				});
				const res_des = await ret_des.json();

				const textPrompt = res_des['description'];
				console.log(textPrompt);
				// console.log(searchResult);

				let payload = { text: textPrompt };
				openAIresult = false;
				const retmod = await fetch('/api/summary-search', {
					method: 'POST',
					body: JSON.stringify(payload)
				});
				const resmod = await retmod.json();
				// console.log(res);
				searchResult = resmod['list'];
				submissionDonButLoading = false;

				// for (let i = 0; i < resmod['list'].length; i++) {
				// 	let existsm = false;
				// 	for (let j = 0; j < searchResult.length; j++) {
				// 		if (resmod['list'][i].id == searchResult[j].id) {
				// 			existsm = true;
				// 			break;
				// 		}
				// 	}
				// 	if (existsm == false) {
				// 		searchResult.push(resmod['list'][i]);
				// 	}
				// }

				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price +
						'. Specifications: ' +
						searchResult[i].payload.Specifications;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textPrompt };
				console.log(context);

				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});

				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;
			} else {
				//only text

				const concatanated = textquery;
				let payload = { text: concatanated };
				openAIresult = false;
				const ret = await fetch('/api/summary-search', {
					method: 'POST',
					body: JSON.stringify(payload)
				});
				const res = await ret.json();
				console.log(res);
				searchResult = res['list'];
				submissionDonButLoading = false;
				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textquery };
				// console.log(context)
				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});
				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;

				// textquery = '';
			}
		} else if (image != null) {
			if (recognizedSpeech.length > 0) {
				//text + image
				const concatanated = recognizedSpeech;
				const formData1 = new FormData();
				const formData2 = new FormData();

				// formData1.append('imageLink', imageUploaded);

				formData2.append('imageLink', imageUploaded);
				formData2.append('requirement', concatanated);
				// const ret = await fetch('/api/image-shortSearch', {
				// 	method: 'POST',
				// 	body: formData1
				// });
				// const res = await ret.json();
				// searchResult = res['list'];

				const ret_des = await fetch('/api/new-description', {
					method: 'POST',
					body: formData2
				});
				const res_des = await ret_des.json();

				const textPrompt = res_des['description'];
				console.log(textPrompt);
				// console.log(searchResult);

				let payload = { text: textPrompt };
				openAIresult = false;
				const retmod = await fetch('/api/summary-search', {
					method: 'POST',
					body: JSON.stringify(payload)
				});
				const resmod = await retmod.json();
				// console.log(res);
				searchResult = resmod['list'];
				submissionDonButLoading = false;

				// for (let i = 0; i < resmod['list'].length; i++) {
				// 	let existsm = false;
				// 	for (let j = 0; j < searchResult.length; j++) {
				// 		if (resmod['list'][i].id == searchResult[j].id) {
				// 			existsm = true;
				// 			break;
				// 		}
				// 	}
				// 	if (existsm == false) {
				// 		searchResult.push(resmod['list'][i]);
				// 	}
				// }

				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price +
						'. Specifications: ' +
						searchResult[i].payload.Specifications;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textPrompt };
				console.log(context);

				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});

				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;
			} else {
				//only image. just roboflow
				const formData1 = new FormData();
				const formData2 = new FormData();

				formData1.append('imageLink', imageUploaded);
				formData2.append('imageLink', imageUploaded);
				const ret = await fetch('/api/image-search', {
					method: 'POST',
					body: formData1
				});
				const res = await ret.json();
				searchResult = res['list'];
				submissionDonButLoading = false;

				const ret_des = await fetch('/api/image-description', {
					method: 'POST',
					body: formData2
				});
				const res_des = await ret_des.json();

				const textPrompt = res_des['description'];
				console.log(textPrompt);
				console.log(searchResult);

				context = '';
				for (let i = 0; i < searchResult.length; i++) {
					context += 'id: ';
					context += searchResult[i].id;
					context += '. Summary: This is a ';
					context +=
						searchResult[i].payload.Category +
						' from ' +
						searchResult[i].payload.Company +
						'. It is a ' +
						searchResult[i].payload.Name +
						'. ' +
						searchResult[i].payload.Description +
						'. Price' +
						searchResult[i].payload.Price;
					context += '\n';
				}
				console.log(context);
				let payload2 = { text: context, query: textPrompt };
				// console.log(context)

				const ret2 = await fetch('/api/sort-embed', {
					method: 'POST',
					body: JSON.stringify(payload2)
				});

				const res2 = await ret2.json();
				console.log(res2['text']);
				let strTmp = '';
				let ok = false;
				for (let i = 0; i < res2['text'].length; i++) {
					if (res2['text'][i] == '[') {
						ok = true;
					} else if (res2['text'][i] == ']') {
						strTmp += res2['text'][i];
						ok = false;
						break;
					}
					if (ok) {
						strTmp += res2['text'][i];
					}
				}
				const finlList = JSON.parse(strTmp);
				// console.log(res2['text']);
				let tempo = [];
				for (let i = 0; i < finlList.length; i++) {
					for (let j = 0; j < searchResult.length; j++) {
						if (searchResult[j].id == finlList[i]) {
							tempo.push(searchResult[j]);
							break;
						}
					}
				}
				openAIList = tempo;
				openAIresult = true;
			}
		} else if (recognizedSpeech.length > 0) {
			//text only
			const concatanated = recognizedSpeech;
			let payload = { text: concatanated };
			openAIresult = false;
			const ret = await fetch('/api/summary-search', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			const res = await ret.json();
			console.log(res);
			searchResult = res['list'];
			submissionDonButLoading = false;
			context = '';
			for (let i = 0; i < searchResult.length; i++) {
				context += 'id: ';
				context += searchResult[i].id;
				context += '. Summary: This is a ';
				context +=
					searchResult[i].payload.Category +
					' from ' +
					searchResult[i].payload.Company +
					'. It is a ' +
					searchResult[i].payload.Name +
					'. ' +
					searchResult[i].payload.Description +
					'. Price' +
					searchResult[i].payload.Price;
				context += '\n';
			}
			console.log(context);
			let payload2 = { text: context, query: textquery };
			// console.log(context)
			const ret2 = await fetch('/api/sort-embed', {
				method: 'POST',
				body: JSON.stringify(payload2)
			});
			const res2 = await ret2.json();
			console.log(res2['text']);
			let strTmp = '';
			let ok = false;
			for (let i = 0; i < res2['text'].length; i++) {
				if (res2['text'][i] == '[') {
					ok = true;
				} else if (res2['text'][i] == ']') {
					strTmp += res2['text'][i];
					ok = false;
					break;
				}
				if (ok) {
					strTmp += res2['text'][i];
				}
			}
			const finlList = JSON.parse(strTmp);
			// console.log(res2['text']);
			let tempo = [];
			for (let i = 0; i < finlList.length; i++) {
				for (let j = 0; j < searchResult.length; j++) {
					if (searchResult[j].id == finlList[i]) {
						tempo.push(searchResult[j]);
						break;
					}
				}
			}
			openAIList = tempo;
			openAIresult = true;

			// recognizedSpeech = '';
		}
	}

	async function audioSubmit() {
		// const blob = await new Blob(chunks, { type: 'audio/mp3' });
		// const recordedAudioFile = await new File([blob], 'recorded_audio.mp3', { type: 'audio/mp3' });
		// console.log(recordedAudioFile);

		// const recordedAudioFile = new File([audioBlob], 'recorded_audio.webm', { type: 'audio/webm' });
		// const formData = new FormData();
		// formData.append('audioFile', recordedAudioFile);

		// const formData = new FormData();
		// formData.append('audioFile', recordedAudioFile);

		// const ret = await fetch('/api/transcribe', {
		// 	method: 'POST',
		// 	body: formData
		// });

		// const res = await ret.json();
		// recognizedSpeech = res['text'];
		// chunks = [];

		// console.log(recognizedSpeech);

		// let payload = { text: recognizedSpeech };
		// const ret11 = await fetch('/api/summary-search', {
		// 	method: 'POST',
		// 	body: JSON.stringify(payload)
		// });
		// const res11 = await ret11.json();
		// searchResult = res11['list'];

		// console.log(searchResult);

		// context = '';
		// for (let i = 0; i < searchResult.length; i++) {
		// 	context += 'id: ';
		// 	context += searchResult[i].id;
		// 	context += '. Summary: This is a ';
		// 	context +=
		// 		searchResult[i].payload.Category +
		// 		' from ' +
		// 		searchResult[i].payload.Company +
		// 		'. It is a ' +
		// 		searchResult[i].payload.Name +
		// 		'. ' +
		// 		searchResult[i].payload.Description +
		// 		'. Price' +
		// 		searchResult[i].payload.Price;
		// 	context += '\n';
		// }
		// console.log(context);
		// let payload2 = { text: context, query: textquery };
		// // console.log(context)

		// const ret2 = await fetch('/api/sort-embed', {
		// 	method: 'POST',
		// 	body: JSON.stringify(payload2)
		// });

		// const res2 = await ret2.json();
		// console.log(res2['text']);
		// let strTmp = '';
		// let ok = false;
		// for (let i = 0; i < res2['text'].length; i++) {
		// 	if (res2['text'][i] == '[') {
		// 		ok = true;
		// 	} else if (res2['text'][i] == ']') {
		// 		strTmp += res2['text'][i];
		// 		ok = false;
		// 		break;
		// 	}
		// 	if (ok) {
		// 		strTmp += res2['text'][i];
		// 	}
		// }
		// const finlList = JSON.parse(strTmp);
		// // console.log(res2['text']);
		// let tempo = [];
		// for (let i = 0; i < finlList.length; i++) {
		// 	for (let j = 0; j < searchResult.length; j++) {
		// 		if (searchResult[j].id == finlList[i]) {
		// 			tempo.push(searchResult[j]);
		// 			break;
		// 		}
		// 	}
		// }
		// openAIList = tempo;
		// openAIresult = true;
		const recordedAudioFile = new File([audioBlob], 'recorded_audio.webm', { type: 'audio/webm' });
		const formData = new FormData();
		formData.append('audioFile', recordedAudioFile);

		const response = await fetch('/api/transcribe', {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			console.error('Failed to submit audio');
			return;
		}

		const result = await response.json();
		recognizedSpeech = result.text;
	}
</script>

<nav class="p-4">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<div class="flex-1">
				<a class="text-xl" href="/auth/home">
					<div class="flex items-center">
						<img src={genie} alt="" class="h-[50px] hover:scale-105" />
						<p class="text-[28px] hover:scale-105 font-semibold">ShopGenie</p>
					</div>
				</a>
			</div>
		</div>
		<div class="flex-none">
			<ul class="links">
				<Themeswitcher />
				<li>
					<a href="/auth/query" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/artificial-intelligence.png"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Query</a
					>
				</li>
				<li>
					<a href="/auth/home" class="flex items-center p-1 font-bold"
						><img
							src="https://dxpcgmtdvyvcxbaffqmt.supabase.co/storage/v1/object/public/demo/home-house-svgrepo-com.svg"
							alt="Dashboard Icon"
							class="h-7 mr-1 hover:rotate-12"
						/>
						Home</a
					>
				</li>
			</ul>
			<div class="dropdown dropdown-end ml-5">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/></svg
						>
						<span class="badge badge-sm indicator-item">{itemCount}</span>
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					tabindex="0"
					class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
				>
					<div class="card-body">
						<span class="font-bold text-lg">{itemCount} Items</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block" on:click={gotocart}>View cart</button>
						</div>
					</div>
				</div>
			</div>
			<div class="dropdown dropdown-end ml-3">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="Tailwind CSS Navbar component" src={userNow.image} />
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/auth/profile" class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><button on:click={handleSignOut}>Logout</button></li>
				</ul>
			</div>
		</div>
	</div>
</nav>

{#if submissionDone}
	<div class="flex flex-col items-center justify-center mb-6">
		<h2 class="text-2xl font-bold font-serif">Query Summary</h2>
	</div>
	<div class="flex flex-row justify-between ml-8 mr-8">
		{#if textquery.length > 0}
			<p class="font-semibold text-xl p-3">
				Text Input: {textquery}
			</p>
		{:else}
			<p class="font-semibold text-xl p-3">No text input</p>
		{/if}

		{#if imageUploaded.length > 0}
			<img
				src={imageUploaded}
				alt="Start"
				class="cursor-pointer w-48 h-48 items-center justify-center"
			/>
		{:else}
			<p class="font-semibold text-xl p-3">No Image input</p>
		{/if}

		{#if recognizedSpeech.length > 0}
			<p class="font-semibold text-xl p-3">
				Audio Input: {recognizedSpeech}
			</p>
		{:else}
			<p class="font-semibold text-xl p-3">No Audio input</p>
		{/if}
	</div>
	{#if submissionDonButLoading}
		<div class="flex flex-col items-center justify-center mt-4">
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
				role="status"
			>
				<span
					class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					>Searching Veactor database For Relevant results...</span
				>
			</div>
		</div>
	{/if}
{:else}
	<div class="p-6 rounded-lg w-full m-4 dark:bg-[#212020]">
		<div class="flex flex-col justify-center items-center mb-3">
			<h2 class="text-2xl font-bold font-serif">Input For Query</h2>
		</div>

		<div class="flex flex-row space-x-10">
			<div class="w-1/3">
				<h1>Textual Query</h1>
				<form on:submit|preventDefault={textSubmit}>
					<input
						class="input input-bordered dark:placeholder:text-[#ffffff9e] w-full max-w-xs"
						type="text"
						id="textquery"
						name="textquery"
						bind:value={textquery}
						placeholder="Enter The Query"
					/>
					<button
						type="submit"
						disabled={textDoneSubmitted || textquery.length === 0}
						class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
					>
						Ok
					</button>
				</form>
				{#if textDoneSubmitted}
					<div class="mt-4 flex flex-col items-center justify-center">
						<h1 class="text-xl font-semibold ml-6 mr-7">
							Text Query was: {textquery}
						</h1>
					</div>
				{/if}
			</div>
			<div class="w-1/3">
				<h1>Image</h1>
				<form on:submit|preventDefault={imageSubmit} enctype="multipart/form-data">
					<input
						class="file-input w-full max-w-xs border border-slate-400"
						type="file"
						id="image"
						name="image"
						disabled={imageUploaded.length > 0}
						bind:value={image}
					/>
					<button
						type="submit"
						disabled={imageUploaded.length > 0 || image == null}
						class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
					>
						Ok
					</button>
				</form>
				{#if imageuploading}
					<div class="flex flex-col items-center justify-center mt-4">
						<div
							class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
							role="status"
						>
							<span
								class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
								>Loading...</span
							>
						</div>
					</div>
				{:else if imageUploaded.length > 0}
					<div class="flex flex-col space-y-3 mt-4">
						<h1 class="text-lg font-semibold">Your Uploaded Image was</h1>
						<img
							src={imageUploaded}
							alt="Start"
							class="cursor-pointer w-1/2 items-center justify-center"
						/>
					</div>
				{/if}
			</div>

			<div class="w-1/3">
				{#if recognizedSpeech === ''}
					<div class="flex items-center justify-center space-x-4">
						{#if $hearingRunning}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<img src={stop} alt="Stop" class="cursor-pointer w-20" on:click={stopRecording} />
						{:else}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<img src={start} alt="Start" class="cursor-pointer w-20" on:click={startRecording} />
						{/if}
						{#if audioURL}
							<div class="mt-4">
								<audio controls src={audioURL} class="w-full"></audio>
							</div>
						{/if}
						<button
							class="btn btn-primary"
							on:click={audioSubmit}
							disabled={!audioURL || $hearingRunning}
						>
							Ok
						</button>
					</div>

					{#if audioURL}
						<div class="mt-4">
							<audio controls src={audioURL} class="w-full"></audio>
						</div>
					{/if}
				{:else}
					<div class="flex items-center justify-center space-x-4">
						<img src={stopdisabled} alt="Stop-disabled" class="cursor-pointer w-20" />
						<h1 class="font-semibold text-xl">
							Your Speech detected was <i>{recognizedSpeech}</i>
						</h1>
					</div>
					<div class="mt-4">
						<audio controls src={audioURL} class="w-full"></audio>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center justify-center mt-6">
			<button
				class="btn text-xl font-semibold dark:text-[#e1e1e1] dark:bg-[#3b6f8e] bg-[#8ad4ff] rounded-xl shadow-md hover:bg-[#619ecf] hover:text-[17px] dark:hover:bg-[#36647e]"
				on:click={finalSubmit}
			>
				Submit query
			</button>
		</div>
	</div>
{/if}

{#if searchResult.length > 0}
	<div class="ml-10 mt-10 flex flex-col items-center justify-center text-center">
		{#if openAIresult}
			<h1 class="font-bold text-2xl font-sans">
				OpenAI Has Analysed. You Can see the Most Relevant search results
			</h1>
		{:else}
			<h1 class="font-bold text-2xl font-sans">
				Showing result fetched from Qdrant. OpenAI analysing..
			</h1>
		{/if}
	</div>

	<div class="flex items-center ml-10 mt-10">
		<label for="toggleB" class="flex items-center cursor-pointer">
			<!-- toggle -->
			<div class="relative">
				<!-- input -->
				<input
					type="checkbox"
					id="toggleB"
					class="sr-only"
					on:click={() => (showOpenAIResults = !showOpenAIResults)}
				/>
				<!-- line -->
				<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
				<!-- dot -->
				<div
					class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
				></div>
			</div>
			<!-- label -->
			<div class="ml-3 text-gray-700 font-medium">
				{showOpenAIResults ? 'OpenAI Results' : 'Vector Database Results'}
			</div>
		</label>
	</div>
	{#if showOpenAIResults}
		<!-- Display OpenAI Results -->
		{#if openAIresult}
			<section
				id="Projects"
				class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
			>
				{#each openAIList as item}
					<div
						class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
					>
						<a href="/auth/productview/{item.id}">
							<img
								src={item.payload.Image_links[0]}
								alt="Product"
								class="h-80 w-72 object-top rounded-t-xl"
							/>
							<div class="px-4 py-3 w-72">
								<div class="flex flex-row space-x-3">
									{#if item.payload.Company === 'Aarong'}
										<img src={aarongimage} alt="" class="w-12 h-12" />
									{:else if item.payload.Company === 'Allen Solly'}
										<img src={allen} alt="" class="w-12 h-12" />
									{:else}
										<img src={apex} alt="" class="w-12 h-12" />
									{/if}
								</div>
								<p class="text-lg font-bold text-black truncate block capitalize">
									{item.payload.Name}
								</p>
								<div class="flex items-center">
									<p class="text-lg font-semibold text-black cursor-auto my-3">
										{item.payload.Price}
									</p>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</section>
		{:else}
			<h1>Result not yet fetched</h1>
		{/if}
	{:else}
		<!-- Display Text Search Results -->
		<section
			id="Projects"
			class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
		>
			{#each searchResult as item}
				<div
					class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
				>
					<a href="/auth/productview/{item.id}">
						<img
							src={item.payload.Image_links[0]}
							alt="Product"
							class="h-80 w-72 object-top rounded-t-xl"
						/>
						<div class="px-4 py-3 w-72">
							<div class="flex flex-row space-x-3">
								{#if item.payload.Company === 'Aarong'}
									<img src={aarongimage} alt="" class="w-12 h-12" />
								{:else if item.payload.Company === 'Allen Solly'}
									<img src={allen} alt="" class="w-12 h-12" />
								{:else}
									<img src={apex} alt="" class="w-12 h-12" />
								{/if}
							</div>
							<p class="text-lg font-bold text-black truncate block capitalize">
								{item.payload.Name}
							</p>
							<div class="flex items-center">
								<p class="text-lg font-semibold text-black cursor-auto my-3">
									{item.payload.Price}
								</p>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</section>
	{/if}
{/if}

<style>
	.links {
		display: flex;
		list-style: none;
		margin: 0;
	}

	.links li {
		margin-left: 2rem;
	}

	.links a {
		text-decoration: none;

		transition: color 0.2s ease-in-out;
	}

	.links a:hover {
		color: #007bff; /* Accent color from Skeleton UI */
	}
	input:checked ~ .dot {
		transform: translateX(100%);
		background-color: #48bb78;
	}

	.dot {
		transition: transform 0.3s ease-in-out;
	}
</style>
