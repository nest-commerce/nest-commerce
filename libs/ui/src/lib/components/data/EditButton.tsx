import { Button, Group, Modal } from '@mantine/core';
import { DATA_TYPE_INPUTS_MAP, DataField } from '../../types';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useValidate } from '../../hooks';
import { IConstructable } from '../../types';
import { getDiff } from '../../utilities';

export interface EditButtonProps<Data> {
  fields: DataField<Data>[];
  data: Data;
  validationClass: IConstructable<Partial<Data>>;
  onConfirmation: (data: Partial<Data>) => void;
}

export const EditButton = <Data,>({
  fields,
  data,
  validationClass,
  onConfirmation,
}: EditButtonProps<Data>) => {
  const { getInputProps, onSubmit, reset } = useForm<Data>({
    initialValues: data,
    validate: useValidate(validationClass),
  });
  const [shouldShowModal, setShouldShowModal] = useState(false);

  return (
    <>
      <Modal
        title={'Edit'}
        closeOnClickOutside={false}
        opened={shouldShowModal}
        onClose={() => setShouldShowModal(false)}
        centered
      >
        <form
          onSubmit={onSubmit((values) => {
            onConfirmation(getDiff(data, values));
            setShouldShowModal(false);
          })}
        >
          <Group direction="column" className="w-full" grow>
            {fields
              .filter(({ editable }) => editable)
              .map(({ key, type, title }, index) => {
                const Field = type && DATA_TYPE_INPUTS_MAP[type];
                return Field ? (
                  <Field key={index} {...getInputProps(key)} label={title} />
                ) : undefined;
              })}
          </Group>
          <Group position="apart" mt="sm">
            <Button
              color="red"
              onClick={() => {
                reset();
                setShouldShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
      <Button color="blue" onClick={() => setShouldShowModal(true)}>
        Edit
      </Button>
    </>
  );
};
