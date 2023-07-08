export const appRoutes = {
  ROOT: "/",
  ACCOUNT: "/account",
  PROFILE: "/profile",
  RESET_PASS: "/reset_pass",
  CREATE_PASS: "/reset_pass/:resetCode",
} as const;

export type AppRoutes = (typeof appRoutes)[keyof typeof appRoutes];
