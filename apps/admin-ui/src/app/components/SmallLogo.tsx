import { Image, ImageProps } from '@mantine/core';
import { FC } from 'react';

const SmallLogo: FC<ImageProps> = (props) => (
  <Image src="assets/icon.svg" alt="logo" {...props} />
);

export default SmallLogo;
