import { updateCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success("New cabin sucessfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  return { isCreating, createCabin };
};
