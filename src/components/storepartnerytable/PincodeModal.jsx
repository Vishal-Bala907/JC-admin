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
import { confirmAlert } from "react-confirm-alert";


const PincodeModal = ({ isOpen, onClose, onConfirm }) => {
  const [pincode, setPincode] = useState("");

  const showConfirmation = () => {
    if (!pincode.trim()) return;

    confirmAlert({
      title: "Confirm Pincode",
      message: `Are you sure you want to add pincode "${pincode.trim()}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onConfirm(pincode.trim());
            setPincode("");
            onClose();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto">
        <ModalHeader className="text-center">Enter Pincode</ModalHeader>
        <ModalBody>
          <Label className="block">
            <span className="text-sm font-medium text-gray-700">Pincode</span>
            <Input
              className="mt-1"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
              inputMode="numeric"
            />
          </Label>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button layout="outline" className="w-full mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full ml-2" onClick={showConfirmation}>
            Confirm
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default PincodeModal;
