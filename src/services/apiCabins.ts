import { Database } from "@/supabase/types/database.types";
import supabase from "../supabase/supabase";

type NewCabinTypes = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
};

export const getCabins = async (): Promise<
  Database["public"]["Tables"]["cabins"]["Row"][]
> => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Unable to load cabins...");
  }

  return data as Database["public"]["Tables"]["cabins"]["Row"][];
};

export const createCabin = async (newCabin: NewCabinTypes): Promise<void> => {
  const { error } = await supabase.from("cabins").insert([newCabin]).select();

  if (error) {
    console.error(error);
    throw new Error("Unable to create cabin...");
  }

  // return data as Database["public"]["Tables"]["cabins"]["Row"][];
};

export const deleteCabin = async (id: number): Promise<void> => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Unable to delete cabin...");
  }
};
