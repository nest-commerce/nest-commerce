import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks';
import { FC } from 'react';

export interface ProtectedOutletProps {
  loginRoute: string;
}

export const ProtectedOutlet: FC<ProtectedOutletProps> = ({ loginRoute }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={loginRoute} />;
  }

  return <Outlet />;
};
