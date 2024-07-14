const roleCheck = (role) => (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
  export default roleCheck;
  