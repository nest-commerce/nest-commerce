import { Button, Group, Modal } from '@mantine/core';
import { FC, useState } from 'react';

export interface DeleteButtonProps {
  onConfirm: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onConfirm }) => {
  const [shouldShowModal, setShouldShowModal] = useState(false);

  return (
    <>
      <Modal
        size="xs"
        centered
        opened={shouldShowModal}
        onClose={() => setShouldShowModal(false)}
        title="Confirm Deletion?"
      >
        <Group position="apart">
          <Button color="blue" onClick={() => setShouldShowModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm}>
            Confirm
          </Button>
        </Group>
      </Modal>
      <Button color="red" onClick={() => setShouldShowModal(true)}>
        Delete
      </Button>
    </>
  );
};
