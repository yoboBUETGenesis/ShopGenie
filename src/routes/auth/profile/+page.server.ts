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

    addPic: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;
        let timeNow = new Date();
        let name = userNow.id + "_" + timeNow;



        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        if (newClass.pic.size) {
            // console.log(newClass.image);
            const { data: res, error: err } = await supabase.storage
                .from('userpics')
                .upload(name, newClass.pic, {
                    cacheControl: '3600',
                    upsert: false
                });

            const { data: link } = await supabase
                .storage
                .from('userpics')
                .getPublicUrl(name)


            console.log(err, link)
            console.log("okk")


            const { data, error: err1 } = await supabase
                .from('userdetails')
                .update({ image: link.publicUrl })
                .eq('id', userNow.id)



            if (err1) console.log(err1)

        }

        throw redirect(303, '/auth/profile');
    },



    addDob: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;




        //console.log(newClass.title, newClass.syllabus, newClass.start, newClass.duration, name)

        const { data: dtt, error: err1 } = await supabase
            .from('userdetails')
            .update({ dob: newClass.dob })
            .eq('id', userNow.id)



        if (err1) console.log(err1)



        throw redirect(303, '/auth/profile');
    },
}