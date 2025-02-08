import jwt from 'jsonwebtoken';

const isLogin = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default isLogin;
