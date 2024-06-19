import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "@/ui/FormRow";
import { Database } from "@/supabase/types/database.types";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";

type FormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

type CreateCabinFormProps = {
  cabinToEdit?: Database["public"]["Tables"]["cabins"]["Row"];
  handleCloseModal?: () => void;
};

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit = { id: undefined },
  handleCloseModal,
}) => {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({ defaultValues: isEditSession ? editValues : {} });
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const img = typeof data.image === "string" ? data.image : data.image[0];

    isEditSession
      ? editCabin(
          { newCabinData: { ...data, image: img, id: editId } },
          {
            onSuccess: () => {
              handleCloseModal?.();
              reset();
            },
          }
        )
      : createCabin({ ...data, image: img }, { onSuccess: () => reset() });
  };

  const onError = () => {
    // this way we can check Error when we submitting a form
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={handleCloseModal ? "modal" : "regular"}
    >
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
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => handleCloseModal?.()}
        >
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
