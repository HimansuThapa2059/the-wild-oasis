import { FC } from "react";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import CabinTable from "@/features/cabins/CabinTable";

const Cabins: FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
};

export default Cabins;
