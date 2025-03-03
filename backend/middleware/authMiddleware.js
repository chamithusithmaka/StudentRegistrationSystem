import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  console.log("Token from client:", token); // Log token to debug
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Token from client:", token); // Log token to debug
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export { verifyToken };
