import { FC } from 'react';
import { Group, Pagination, Paper, Select, Text } from '@mantine/core';
import { classnames } from '../utilities';

export const PAGE_SIZES = [10, 20, 50, 100];

export interface PaginationWithSizeProps {
  className?: string;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalItemCount: number;
}

export const PaginationWithSize: FC<PaginationWithSizeProps> = ({
  className,
  page,
  setPage,
  totalItemCount,
  pageSize,
  setPageSize,
}) => (
  <Paper className={classnames('w-full', className)} radius={0}>
    <Group position="apart">
      <Pagination
        page={page}
        total={Math.ceil(totalItemCount / pageSize)}
        onChange={setPage}
      />
      <Group>
        <Text>Page size:</Text>
        <Select
          data={PAGE_SIZES.map(String)}
          value={pageSize.toString()}
          onChange={(pageSize) => setPageSize(Number(pageSize))}
        />
      </Group>
    </Group>
  </Paper>
);
