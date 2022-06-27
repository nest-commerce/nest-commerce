import { Burger, Button, Group, Header, MediaQuery } from '@mantine/core';
import { FC } from 'react';
import LargeLogo from '../components/LargeLogo';
import { IconMoon, IconSun } from '@tabler/icons';
import { useDarkMode } from '@nest-commerce/ui';

interface AppHeaderProps {
  isOpened: boolean;
  setIsOpened: (o: boolean) => void;
}

const AppHeader: FC<AppHeaderProps> = ({ isOpened, setIsOpened }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Header className="flex justify-between items-center" height={70} px="md">
      <Group>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={isOpened}
            onClick={() => setIsOpened(!isOpened)}
            size="sm"
          />
        </MediaQuery>
        <LargeLogo height={100} />
      </Group>
      <Button
        className="w-8 h-8"
        p={0}
        onClick={toggleDarkMode}
        color={isDarkMode ? 'yellow' : 'dark'}
        variant="outline"
      >
        {isDarkMode ? <IconSun /> : <IconMoon />}
      </Button>
    </Header>
  );
};

export default AppHeader;
