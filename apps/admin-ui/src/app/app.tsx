import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedOutlet from './layouts/ProtectedOutlet';
import UsersDashboard from './pages/UsersDashboard';
import { Route as RouteEnum } from './configs/routes';
import { useEffect } from 'react';
import useThemeChange from './hooks/useThemeChange';
import { MantineProvider } from '@mantine/core';

export function App() {
  const { theme: colorScheme, setTheme } = useThemeChange();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path={RouteEnum.ADMIN}>
          <Route element={<ProtectedOutlet />}>
            <Route index element={<Navigate replace to={RouteEnum.Users} />} />
            <Route path={RouteEnum.Users} element={<UsersDashboard />} />
          </Route>
          <Route path={RouteEnum.LOGIN} element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate to={RouteEnum.ADMIN} />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
