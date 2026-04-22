"use server";

import { db } from "@/app/utils/db";


export async function createMovie(formData : FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;

        await db.movie.create({
            data: {
                title: title,
                description: description,
                image: image
            }
        });
}
    