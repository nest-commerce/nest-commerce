import { Button, Group, Modal, Stack } from '@mantine/core';
import {
  DATA_TYPE_INPUTS_MAP,
  DataField,
  getEditableFieldsWithValue,
} from '../../types';
import { ReactNode, useState } from 'react';
import { useForm } from '@mantine/form';
import { useValidate } from '../../hooks';
import { IConstructable } from '../../types';
import { getDiff } from '../../utilities';

export interface EditButtonProps<Data> {
  fields: DataField<Data>[];
  data?: Data;
  validationClass: IConstructable<Partial<Data>>;
  onConfirmation: (data: Partial<Data>) => void;
  label?: ReactNode;
  modalSize?: string | number;
  resetOnSave?: boolean;
}

export const EditButton = <Data,>({
  fields,
  data,
  validationClass,
  onConfirmation,
  label = 'Edit',
  modalSize,
  resetOnSave,
}: EditButtonProps<Data>) => {
  const initialValues = data ? data : getEditableFieldsWithValue(fields, '');
  const { getInputProps, onSubmit, reset } = useForm<Data>({
    initialValues,
    validate: useValidate(validationClass),
  });
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const cancelFn = () => {
    reset();
    setShouldShowModal(false);
  };

  return (
    <>
      <Modal
        title={label}
        closeOnClickOutside={false}
        opened={shouldShowModal}
        onClose={cancelFn}
        centered
        size={modalSize}
      >
        <form
          onSubmit={onSubmit((values) => {
            onConfirmation(getDiff(initialValues, values));
            setShouldShowModal(false);
            resetOnSave && reset();
          })}
        >
          <Stack className="w-full">
            {fields
              .filter(({ editable }) => editable)
              .map(({ key, type, title }, index) => {
                const Field = type && DATA_TYPE_INPUTS_MAP[type];
                return Field ? (
                  <Field key={index} {...getInputProps(key)} label={title} />
                ) : undefined;
              })}
          </Stack>
          <Group position="apart" mt="sm">
            <Button color="red" onClick={cancelFn}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
      <Button color="blue" onClick={() => setShouldShowModal(true)}>
        {label}
      </Button>
    </>
  );
};
