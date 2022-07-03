import { FC, ReactNode } from 'react';
import moment from 'moment';
import { EmailInput, RichTextEditor } from '../components/inputs';
import { Anchor, TextInput } from '@mantine/core';

export type DataFieldType = 'email' | 'date' | 'text' | 'rich';

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
  email: (email: string) => <Anchor href={`mailto:${email}`}>{email}</Anchor>,
  rich: (data: string) => (
    <RichTextEditor value={data} onChange={() => ({})} readOnly />
  ),
};

export const DATA_TYPE_INPUTS_MAP: Partial<Record<DataFieldType, FC<any>>> = {
  email: EmailInput,
  text: TextInput,
  rich: RichTextEditor,
};

export const getEditableFieldsWithValue = <T,>(
  fields: DataField<T>[],
  value: string
) =>
  fields
    .filter(({ editable }) => editable)
    .reduce((values, { key }) => ({ ...values, [key]: value }), {} as T);
