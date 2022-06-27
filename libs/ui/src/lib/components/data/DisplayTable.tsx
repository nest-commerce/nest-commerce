import { Table, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { DATA_TYPE_PROCESSORS_MAP, DataField } from '../../types';

export interface DataDisplayTableProps<T> {
  fields: DataField<T>[];
  data: T;
}

export const DisplayTable = <T,>({
  fields,
  data,
}: DataDisplayTableProps<T>) => (
  <Table>
    <tbody>
      {fields
        .filter(({ hidden }) => !hidden)
        .map(({ key, title, type }) => (
          <tr key={key.toString()}>
            <td>
              <Title order={6}>{title}:</Title>
            </td>
            <td>
              {type && DATA_TYPE_PROCESSORS_MAP[type]
                ? DATA_TYPE_PROCESSORS_MAP[type]?.(data[key])
                : (data[key] as unknown as ReactNode)}
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);
