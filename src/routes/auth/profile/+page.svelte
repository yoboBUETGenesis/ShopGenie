<script>
	import { enhance } from '$app/forms';

	export let data;
	let { session, supabase, userNow } = data;
	$: ({ session, supabase, userNow } = data);
	const handleSignOut = async () => {
		console.log('logout start');
		await data.supabase.auth.signOut();
		console.log('logout done');
		window.open('/login', '_self');
	};

	function calculateAge(dob) {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	// let WorkExperiencesFrom;
	// let WorkExperiencesTo;
	// let WorkExperiencesInstitute;
	// let WorkExperiencesPosition;
	// let WorkExperiencesImage;

	// let showaddWorkExperiences = false;
	// function addclassmodal() {
	// 	showaddWorkExperiences = true;
	// }

	// function closeclassmodal() {
	// 	showaddWorkExperiences = false;
	// }

	// let PresentFrom;
	// let PresentInstitute;
	// let PresentPosition;
	// let PresentImage;

	// let showPresentModal = false;
	// function addpresentModal() {
	// 	showPresentModal = true;
	// }

	// function closePresentModal() {
	// 	showPresentModal = false;
	// }

	// let certicicatesReceived;
	// let certicicatesIssuer;
	// let certicicatesName;
	// let certicicatesImage;
	// let certicicatesLink;

	// let showCerticicatesModal = false;
	// function addcerticicatesModal() {
	// 	showCerticicatesModal = true;
	// }

	// function closecerticicatesModal() {
	// 	showCerticicatesModal = false;
	// }

	// let skillsbody;
	// let showskillsModal = false;
	// function addskillsModal() {
	// 	showskillsModal = true;
	// }

	// function closeskillsModal() {
	// 	showskillsModal = false;
	// }
</script>

<h1>
	{userNow.name}
</h1>
<h1>
	{userNow.gender}
</h1>
