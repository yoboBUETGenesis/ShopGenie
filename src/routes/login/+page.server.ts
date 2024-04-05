import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const load = async (event) => {
    const form = await superValidate(event, userSchema);
    return { form }
};

const userSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: 'Email is required' })
        .max(256, { message: 'Email must be less than 256 characters' })
        .email({ message: 'Email must be a valid email address' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(32, { message: 'Password must be less than 32 characters' })
        .regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
        .regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
        .regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
        .regex(
            new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
            'Password must contain at least one special character'
        )
        .trim()
});

export const actions = {
    login: async (event) => {
        console.log("backend e aschi");
        const form = await superValidate(event, userSchema);
        console.log(form);

        if (!form.valid) {
            return message(form, 'Invalid form')
        }

        const body = form.data;
        // console.log(body);

        const { data, error: err } = await event.locals.supabase.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        });

        if (err) {
            // console.log(err);
            if (err instanceof AuthApiError && err.status === 400) {
                return message(form, 'Invalid credentials', {
                    status: 400
                })
            }

            return message(form, 'Server error. Try again later', {
                status: 500
            })
        }

        //Add user if not already added 


        throw redirect(303, '/auth/home');
    }
};