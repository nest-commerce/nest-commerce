import { FC, ReactNode } from 'react';
import moment from 'moment';
import { EmailInput } from '../components/inputs';
import {
  InputBaseProps,
  InputWrapperBaseProps,
  TextInput,
} from '@mantine/core';
import { emailToAnchor } from '../utilities';

export type DataFieldType = 'email' | 'date' | 'text';

export interface DataField<T> {
  key: keyof T;
  title: ReactNode;
  type?: DataFieldType;
  editable?: boolean;
  hidden?: boolean;
}

export const DATA_TYPE_PROCESSORS_MAP: Partial<
  Record<DataFieldType, (data: any) => ReactNode>
> = {
  date: (data: Date) => moment(data).format('DD MMM yyyy hh:mma').toString(),
  email: emailToAnchor,
};

export const DATA_TYPE_INPUTS_MAP: Partial<
  Record<DataFieldType, FC<InputBaseProps & InputWrapperBaseProps>>
> = {
  email: EmailInput,
  text: TextInput,
};
