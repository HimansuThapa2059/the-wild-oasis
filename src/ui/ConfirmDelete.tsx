import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { FC } from "react";
import SpinnerMini from "./SpinnerMini";

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  isDeleting: boolean;
  handleCloseModal?: () => void;
};

const FlexedButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  isDeleting,
  handleCloseModal,
}) => {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={() => handleCloseModal?.()}
        >
          Cancel
        </Button>
        <FlexedButton
          $variation="danger"
          disabled={disabled}
          onClick={onConfirm}
        >
          {isDeleting && <SpinnerMini />}
          <span>Delete</span>
        </FlexedButton>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
