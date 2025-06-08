export const ROLES = {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  HR_ADMIN: 'HR ADMIN',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
