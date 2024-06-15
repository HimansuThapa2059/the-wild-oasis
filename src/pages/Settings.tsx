import { FC } from "react";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

const Settings: FC = () => {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
