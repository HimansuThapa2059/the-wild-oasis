import { getCabins } from "@/services/apiCabins";
import { Database } from "@/supabase/types/database.types";
import { useQuery } from "@tanstack/react-query";

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery<Database["public"]["Tables"]["cabins"]["Row"][]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
};
