import { Image, ImageProps } from '@mantine/core';
import { FC } from 'react';

const LargeLogo: FC<ImageProps> = (props) => (
  <Image src="assets/icon-large.svg" alt="icon" {...props} />
);

export default LargeLogo;
