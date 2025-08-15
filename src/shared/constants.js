const CHANNELS = {
  ADMIN_UNLOCK_USER: 'admin-unlock-user',
  ADMIN_LOGIN: 'admin-login',
  USER_LOGIN: 'login-user',
  LOGOUT: 'logout',
  GET_USERS: 'get-users',
  GET_SESSION: 'get-session',
  REGISTER_USER: 'register-user'
};

// ESM export
// export { CHANNELS };

// CommonJS export
module.exports = { CHANNELS };
// module.exports = { CHANNELS };
// if (typeof module !== 'undefined') {
//   module.exports = { CHANNELS };
// }