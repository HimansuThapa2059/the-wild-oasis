import { Database } from "@/supabase/types/database.types";
import supabase, { supabaseUrl } from "@/supabase/supabase";

type createEditCabinProps = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string;
  id?: number;
};
type cabinType = Database["public"]["Tables"]["cabins"]["Row"];

export const getCabins = async (): Promise<cabinType[]> => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Unable to load cabins");
  }
  return data as Database["public"]["Tables"]["cabins"]["Row"][];
};

export const createEditCabin = async (
  cabin: createEditCabinProps
): Promise<cabinType> => {
  console.log(cabin);
  const hasImagePath = typeof cabin.image === "string";
  const imageName =
    typeof cabin.image === "string"
      ? cabin.image
      : `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? (cabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // A. For Create or Edit
  let query: any = supabase.from("cabins");

  // 1. To create cabin
  if (!cabin.id) query = query.insert([{ ...cabin, image: imagePath }]);

  // 2. To edit cabin
  if (cabin.id)
    query = query
      .update({ ...cabin, image: imagePath })
      .eq("id", cabin.id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Unable to create cabin");
  }

  // 2. Create image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error("Error uploading cabin image");
  }
  return data;
};

// Delete a cabin
export const deleteCabin = async (id: number): Promise<void> => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Unable to delete cabin");
  }
};
