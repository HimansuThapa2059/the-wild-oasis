import { updateCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type PassingParams = {
  newCabinData: {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: File | string;
    id?: number;
  };
};

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData }: PassingParams) => updateCabin(newCabinData),
    onSuccess: () => {
      toast.success("Cabin sucessfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  return { isEditing, editCabin };
};
