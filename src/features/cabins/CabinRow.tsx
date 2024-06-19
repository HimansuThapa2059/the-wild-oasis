import { Database } from "@/supabase/types/database.types";
import Button from "@/ui/Button";
import { formatCurrency } from "@/utils/helpers";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./hooks/useCreateCabin";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

type CabinRowProps = {
  cabin: Database["public"]["Tables"]["cabins"]["Row"];
};

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    discount,
    image,
    maxCapacity,
    name,
    regularPrice,
    description,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `copy of ${name}`,
      discount: discount as number,
      image: image as string,
      maxCapacity: maxCapacity as number,
      regularPrice: regularPrice as number,
      description: description as string,
    });
  };

  const handleNotFound = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/not-found.jpg";
  };

  return (
    <TableRow role="row">
      <Img src={image ? image : ""} onError={handleNotFound} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice ? formatCurrency(regularPrice) : ""}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Button
          $variation="primary"
          $size="small"
          onClick={handleDuplicate}
          disabled={isDeleting && isCreating}
        >
          <HiSquare2Stack />
        </Button>

        <Modal>
          <Modal.Open opens="edit">
            <Button $variation="primary" $size="small">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="confirmDelete">
            <Button $variation="primary" $size="small" disabled={isDeleting}>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="confirmDelete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              isDeleting={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;
