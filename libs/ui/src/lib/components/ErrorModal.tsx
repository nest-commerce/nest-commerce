import { Alert, Modal } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

export interface ErrorModalProps {
  error: Error | null;
  onClose: () => void;
}

export const ErrorModal = ({ error, onClose }: ErrorModalProps) => (
  <Modal opened={!!error} onClose={onClose}>
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="An error has occurred"
      color="red"
    >
      {error?.message}
    </Alert>
  </Modal>
);
