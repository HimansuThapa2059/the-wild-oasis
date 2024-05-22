import { Database } from "@/supabase/types/database.types";
import supabase, { supabaseUrl } from "@/supabase/supabase";

type NewCabinTypes = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
};

export const getCabins = async (): Promise<
  Database["public"]["Tables"]["cabins"]["Row"][]
> => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Unable to load cabins");
  }

  return data as Database["public"]["Tables"]["cabins"]["Row"][];
};

export const createCabin = async (newCabin: NewCabinTypes): Promise<void> => {
  console.log(newCabin.image);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://zlygckncitbvysugssvx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Unable to create cabin");
  }
  // 2. Create image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);

    console.error(storageError);
    throw new Error("Error uploading cabin image");
  }
  // return data as Database["public"]["Tables"]["cabins"]["Row"][];
};

export const deleteCabin = async (id: number): Promise<void> => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Unable to delete cabin");
  }
};
