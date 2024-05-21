import { FC, useState } from "react";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import CabinTable from "@/features/cabins/CabinTable";
import Button from "@/ui/Button";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";

const Cabins: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
};

export default Cabins;
