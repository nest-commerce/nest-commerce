import { TextInput, TextInputProps } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import { FC } from 'react';

export const EmailInput: FC<TextInputProps> = (props) => (
  <TextInput icon={<IconAt />} label="Email" {...props} />
);
