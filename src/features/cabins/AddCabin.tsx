import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import CabinTable from "./CabinTable";

// const AddCabin: React.FC = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <RightSideButton>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal handleClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm handleCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </RightSideButton>
//   );
// };
const RightSideButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const AddCabin: React.FC = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <RightSideButton>
          <Button>Add new cabin</Button>
        </RightSideButton>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};
export default AddCabin;
