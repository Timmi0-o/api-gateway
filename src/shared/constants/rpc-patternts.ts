export const RPC_PATTERNS = {
  auth: {
    login: 'auth.login',
    register: 'auth.register',
    logout: 'auth.logout',
    refresh: 'auth.refresh',
    resetPassword: 'auth.reset-password',
    sendResetPasswordEmail: 'auth.send-reset-password-email',
    validateResetPasswordToken: 'auth.validate-reset-password-token',
  },
  user: {
    register: 'auth.register',
    getMany: 'user.get-users',
  },
} as const;
