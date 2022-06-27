import { Button, Group, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { useUser } from '../../hooks';

export const LogoutButton = () => {
  const { setUser } = useUser();
  return (
    <Button
      className="h-12"
      fullWidth
      radius="xs"
      color="dark"
      variant="default"
      onClick={() => setUser(null)}
    >
      <Group>
        <Text>Logout</Text>
        <IconLogout />
      </Group>
    </Button>
  );
};
