import { useLocation } from 'react-router-dom';
import { capitalize } from '@nrwl/workspace/src/utils/strings';

export interface Breadcrumb {
  name: string;
  location: string;
}

export const useBreadcrumbs = (): Breadcrumb[] => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.substring(1).split('/');

  return breadcrumbs.map((breadcrumb, index) => ({
    name: capitalize(breadcrumb),
    location: '/' + breadcrumbs.slice(0, index + 1).join('/'),
  }));
};
