// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_MANAGER = '/manager';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_MANAGER = {
  root: ROOTS_MANAGER,
  dashboards: path(ROOTS_MANAGER, '/dashboards'),
  one: path(ROOTS_MANAGER, '/one'),
  two: path(ROOTS_MANAGER, '/two'),
  three: path(ROOTS_MANAGER, '/three'),
  user: {
    root: path(ROOTS_MANAGER, '/user'),
    list: path(ROOTS_MANAGER, '/user/list'),
  },
  product: {
    root: path(ROOTS_MANAGER, '/product'),
    list: path(ROOTS_MANAGER, '/product/list'),
  },
  contract: {
    root: path(ROOTS_MANAGER, '/contract'),
    list: path(ROOTS_MANAGER, '/contract/list'),
  },
  brand: {
    root: path(ROOTS_MANAGER, '/brand'),
    edit: path(ROOTS_MANAGER, '/brand/edit'),
    list: path(ROOTS_MANAGER, '/brand/list'),
  },
  salesMan: {
    root: path(ROOTS_MANAGER, '/sales-man'),
    list: path(ROOTS_MANAGER, '/sales-man/list'),
    organizationChart: path(ROOTS_MANAGER, '/sales-man/organization-chart'),
  },
};
