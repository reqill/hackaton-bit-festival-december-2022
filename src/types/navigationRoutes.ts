export type NavigationRoute = {
  relativePath: string;
  pageName: string;
  description?: string;
  nestedRoutes?: Omit<NavigationRoutes, 'nestedRoutes'>;
};

export type NavigationRoutes = NavigationRoute[];
