import useOutsideClick from "@/hooks/useOutsideClick";
import {
  createContext,
  useContext,
  useState,
  cloneElement,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

type WindowProps = {
  children: ReactElement;
  name: string;
};

type OpenProps = {
  children: React.ReactElement;
  opens: string;
};

type ContextType = {
  openedWindow: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ContextType>({
  openedWindow: "",
  open: () => {},
  close: () => {},
});

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openedWindow, setOpenedWindow] = useState("");

  const close = () => setOpenedWindow("");
  const open = (name: string) => setOpenedWindow(name);

  return (
    <ModalContext.Provider value={{ openedWindow, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }: OpenProps) => {
  const { open } = useContext(ModalContext) as ContextType;
  return cloneElement(children, { onClick: () => open(opens) });
};

const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openedWindow, close } = useContext(ModalContext) as ContextType;

  const modalRef = useOutsideClick(close, true);

  if (name !== openedWindow) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { handleCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
