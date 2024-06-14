import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "@/services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "@/ui/FormRow";
import { Database } from "@/supabase/types/database.types";

type FormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

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
type CreateCabinFormProps = {
  cabinToEdit?: Database["public"]["Tables"]["cabins"]["Row"];
};

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit = {},
}) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({ defaultValues: isEditSession ? editValues : {} });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin sucessfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData }: PassingParams) =>
      createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("Cabin sucessfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const img = typeof data.image === "string" ? data.image : data.image[0];

    isEditSession
      ? editCabin({ newCabinData: { ...data, image: img, id: editId } })
      : createCabin({ ...data, image: img });
  };

  const onError = () => {
    // this way we can check Error when we submitting a form
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="MaxCapicity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be atleast $1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            validate: (value: number) =>
              value <= getValues().regularPrice ||
              "Discount should be less than Regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit" : "Create"} cabin
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
