
import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "@windmill/react-ui";

const PincodeModal = ({ isOpen, onClose, onConfirm }) => {
  const [pincode, setPincode] = useState("");

  const handleConfirm = () => {
    onConfirm(pincode);
    setPincode(""); // Reset input
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Enter Pincode</ModalHeader>
      <ModalBody>
        <Label>
          <span>Pincode</span>
          <Input
            className="mt-1"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button  onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PincodeModal;
