import React, { useCallback } from "react";
import {
  DialogContentContainer,
  Modal,
  ModalContent,
} from "monday-ui-react-core";
import AddEditFragrance from "./Forms/AddEdit.tsx";
import { FragranceModalProps } from "./types.ts";

const FragranceModal = ({
  selectedFragrance,
  setSelectedFragrance,
  show,
  setShow,
}: FragranceModalProps) => {
  const closeModal = useCallback(() => {
    setShow(false);
    setSelectedFragrance(undefined);
  }, [setShow]);
  const modalTitle = selectedFragrance ? "Edit" : "Add";

  return (
    <Modal
      title={`${modalTitle} a New Fragrance`}
      show={show}
      onClose={closeModal}
    >
      <ModalContent>
        <DialogContentContainer>
          <AddEditFragrance
            initialFragrance={selectedFragrance}
            onCompleted={() => setSelectedFragrance(undefined)}
            closeModal={closeModal}
          />
        </DialogContentContainer>
      </ModalContent>
    </Modal>
  );
};

export default FragranceModal;
