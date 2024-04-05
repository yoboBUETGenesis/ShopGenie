import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


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


    // let { data: past, error: err2 } = await supabase
    //     .from('past')
    //     .select("*")
    //     .eq('userid', userNow.id)


    // let { data: present, error: err3 } = await supabase
    //     .from('present')
    //     .select("*")
    //     .eq('userid', userNow.id)


    // let { data: certificates, error } = await supabase
    //     .from('certificates')
    //     .select("*")
    //     .eq('userid', userNow.id)


    // let { data: skills, error: err4 } = await supabase
    //     .from('skills')
    //     .select("*")
    //     .eq('userid', userNow.id)


    return { userNow };
}

export const actions = {
    addWorkExperiences: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = userNow.id + "_" + newClass.WorkExperiencesInstitute;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.WorkExperiencesImage.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('workExperiences')
                .upload(name, newClass.WorkExperiencesImage, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('workExperiences')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('past')
                .insert([
                    { userid: userNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, position: newClass.WorkExperiencesPosition, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('past')
                .insert([
                    { userid: userNow.id, from: newClass.WorkExperiencesFrom.toString(), to: newClass.WorkExperiencesTo.toString(), institute: newClass.WorkExperiencesInstitute, position: newClass.WorkExperiencesPosition }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/protected/profile');
    },
    addCurrentAffliation: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = userNow.id + "_" + newClass.PresentInstitute;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.PresentImage.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('workPresent')
                .upload(name, newClass.PresentImage, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('workPresent')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('present')
                .insert([
                    { userid: userNow.id, from: newClass.PresentFrom.toString(), institute: newClass.PresentInstitute, position: newClass.PresentPosition, image: link.publicUrl }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('present')
                .insert([
                    { userid: userNow.id, from: newClass.PresentFrom.toString(), institute: newClass.PresentInstitute, position: newClass.PresentPosition }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/protected/profile');
    },
    addSkill: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;


        const { data: dt, error: err1 } = await supabase
            .from('skills')
            .insert([
                { userid: userNow.id, body: newClass.skillsbody }
            ])


        if (err1) console.log(err1)





        throw redirect(303, '/protected/profile');
    },
    addCertificate: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;

        let name = userNow.id + "_" + newClass.certicicatesIssuer;

        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.certicicatesImage.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('certificates')
                .upload(name, newClass.certicicatesImage, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('certificates')
                .getPublicUrl(name)


            console.log(err, link)

            const { data: dt, error: err1 } = await supabase
                .from('certificates')
                .insert([
                    { userid: userNow.id, received: newClass.certicicatesReceived.toString(), issuer: newClass.certicicatesIssuer, name: newClass.certicicatesName, image: link.publicUrl, link: newClass.certicicatesLink }
                ])


            if (err1) console.log(err1)

        }
        else {

            const { data: dt, error: err1 } = await supabase
                .from('certificates')
                .insert([
                    { userid: userNow.id, received: newClass.certicicatesReceived.toString(), issuer: newClass.certicicatesIssuer, name: newClass.certicicatesName, link: newClass.certicicatesLink }
                ])


            if (err1) console.log(err1)

        }



        throw redirect(303, '/protected/profile');
    },
    // deleteTodo: async ({ url, locals: { supabase, getSession } }) => {
    //     const todoid = url.searchParams.get("id")
    //     console.log("ami todo delete korte chai ", todoid);

    //     if (!todoid) {
    //         return fail(400, { message: "Invalid request" })
    //     }

    //     const { error: err } = await supabase
    //         .from('todo')
    //         .delete()
    //         .eq("id", todoid)

    //     if (err) console.log(err)
    //     else throw redirect(303, '/protected/planner');

    // },
    // enroll: async ({ url, locals: { supabase, getSession } }) => {
    //     const cid = url.searchParams.get("id")
    //     // console.log("ami todo Update korte chai ", todoid);

    //     if (!cid) {
    //         return fail(400, { message: "Invalid request" })
    //     }


    //     const { data: dtt, error: err1 } = await supabase
    //         .from('studclass')
    //         .insert([
    //             { sid: userNow.id, cid: cid },
    //         ])


    //     if (err1) return fail(400, { message: "Invalid request" })
    //     else throw redirect(303, '/protected/learning');

    // },

}