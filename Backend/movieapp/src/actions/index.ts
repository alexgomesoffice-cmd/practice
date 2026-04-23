"use server";

import { db } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function createMovie(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("imageUrl") as string;

  if (!title || !description || !image) {
    throw new Error("All fields are required");
  }

  await db.movie.create({
    data: { title, description, image },
  });

  revalidatePath("/all-movies");
  redirect("/all-movies");
}

export async function deleteMovie(formData: FormData) {
  const movieId = formData.get("movieID") as string;

  try {
    await db.movie.delete({ where: { id: movieId } });
    revalidatePath("/all-movies");
  } catch (error) {
    throw new Error("Movie not found or already deleted");
  }
}

export async function editMovie(formData: FormData) {
  const movieId = formData.get("movieID") as string;
  const newTitle = formData.get("title") as string;
  const newDescription = formData.get("description") as string;
  const newImageUrl = formData.get("imageUrl") as string;

  if (!newTitle || !newDescription || !newImageUrl) {
    throw new Error("All fields are required");
  }

  try {
    await db.movie.update({
      where: { id: movieId },
      data: {
        title: newTitle,
        description: newDescription,
        image: newImageUrl,
      },
    });
    revalidatePath("/all-movies");
  } catch (error) {
    throw new Error("Movie not found or update failed");
  }
}