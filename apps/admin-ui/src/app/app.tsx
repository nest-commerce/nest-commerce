import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UsersDashboard from './pages/UsersDashboard';
import { Route as RouteEnum } from './configs/routes';
import { MantineProvider } from '@mantine/core';
import UserProfile from './pages/UserProfile';
import { ProtectedOutlet, useDarkMode } from '@nest-commerce/ui';

export function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <MantineProvider
      theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Routes>
        <Route path={RouteEnum.ADMIN}>
          <Route element={<ProtectedOutlet loginRoute={RouteEnum.LOGIN} />}>
            <Route index element={<Navigate replace to={RouteEnum.USERS} />} />
            <Route path={RouteEnum.USERS} element={<UsersDashboard />} />
            <Route path={RouteEnum.USER_PROFILE} element={<UserProfile />} />
          </Route>
          <Route path={RouteEnum.LOGIN} element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate to={RouteEnum.ADMIN} />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
