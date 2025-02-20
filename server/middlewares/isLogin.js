import jwt from 'jsonwebtoken';

const isLogin = (req, res, next) => {
  // Ensure cookies exist before accessing them
  if (!req.cookies || !req.cookies.authToken) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  console.log(req.cookies.authToken);
  

  const token = req.cookies.authToken;
  console.log('Token received:', token);

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default isLogin;
