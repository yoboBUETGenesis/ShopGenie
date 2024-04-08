import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let userNow;
export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession()
    const viewId = params.uid;

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
    let { data: cart, error: err25 } = await supabase
        .from('cart')
        .select("*")
        .eq('uid', userNow.id)

    let itemCount = cart?.length;

    let { data: userdetails2, error: err2 } = await supabase
        .from('userdetails')
        .select("*")
        .eq('id', viewId)
    console.log(err);
    let viewUser = userdetails2[0];


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


    return { userNow, viewUser, itemCount };
}

