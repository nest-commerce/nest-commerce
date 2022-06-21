import { Burger, Header, Image, MediaQuery } from '@mantine/core';
import { FC } from 'react';

interface AppHeaderProps {
  isOpened: boolean;
  setIsOpened: (o: boolean) => void;
}

const AppHeader: FC<AppHeaderProps> = ({ isOpened, setIsOpened }) => (
  <Header className="flex items-center" height={70} px="md">
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <Burger
        opened={isOpened}
        onClick={() => setIsOpened(!isOpened)}
        size="sm"
      />
    </MediaQuery>
    <Image src="assets/icon-large.svg" alt="icon" height={100} />
  </Header>
);

export default AppHeader;
