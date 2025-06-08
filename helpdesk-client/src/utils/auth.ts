 
export const ROLES = ['EMPLOYEE', 'MANAGER', 'HR ADMIN'] as const;
export type Role = typeof ROLES[number];

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};