import { ROLE } from './roles';

type Route = {
  path: string;
  roles: ROLE[];
};

// order affect regex
export const RouteWithRoles: Route[] = [
  {
    path: '/server',
    roles: [ROLE.ADMIN],
  },
  {
    path: '/client/(.+)',
    roles: [ROLE.ADMIN],
  },
  {
    path: '/client',
    roles: [ROLE.ADMIN, ROLE.USER],
  },
  {
    path: '/not-found',
    roles: [],
  },
  {
    path: '/login',
    roles: [],
  },
  {
    path: '/register',
    roles: [],
  },
  {
    path: '/',
    roles: [],
  },
];
