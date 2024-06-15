import { deleteCabin as deleteApiCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteApiCabin,
    onSuccess: () => {
      toast.success("Cabin deleted sucessfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
};
