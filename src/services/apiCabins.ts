import { Database } from "@/data/types/database.types";
import supabase from "./supabase";

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
