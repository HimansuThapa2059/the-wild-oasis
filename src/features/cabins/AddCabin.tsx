import Button from "@/ui/Button";
import { useState } from "react";
import Modal from "@/ui/Modal";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";

const RightSideButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const AddCabin: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <RightSideButton>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal handleClose={() => setIsOpenModal(false)}>
          <CreateCabinForm handleCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </RightSideButton>
  );
};

export default AddCabin;
