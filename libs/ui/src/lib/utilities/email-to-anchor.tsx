import { Anchor } from '@mantine/core';

export const emailToAnchor = (email: string) => (
  <Anchor href={`mailto:${email}`}>{email}</Anchor>
);
