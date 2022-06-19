import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedOutlet from './layouts/ProtectedOutlet';
import AdminDashboard from './pages/Dashboard';
import { Route as RouteEnum } from './configs/routes';

export function App() {
  return (
    <Routes>
      <Route path={RouteEnum.ADMIN}>
        <Route element={<ProtectedOutlet />}>
          <Route
            index
            element={<Navigate replace to={RouteEnum.DASHBOARD} />}
          />
          <Route path={RouteEnum.DASHBOARD} element={<AdminDashboard />} />
        </Route>
        <Route path={RouteEnum.LOGIN} element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to={RouteEnum.ADMIN} />} />
    </Routes>
  );
}

export default App;
