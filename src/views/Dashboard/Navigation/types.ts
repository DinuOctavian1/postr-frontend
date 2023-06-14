export const ActiveComponent = {
  CONNECT_ACCOUNTS: 'CONNECT_ACCOUNTS',
  CREATE_POST: 'CREATE_POST',
  PLANNER: 'PLANNER',
} as const;

export type ActiveComponentType =
  (typeof ActiveComponent)[keyof typeof ActiveComponent];
