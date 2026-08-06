// Role-Based Authorization Middleware Stub (patient, doctor, admin)

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    next();
  };
};
