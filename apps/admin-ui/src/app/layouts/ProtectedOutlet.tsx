import useUser from '../hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';
import { Route } from '../configs/routes';

const ProtectedOutlet = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={Route.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedOutlet;
