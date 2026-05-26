import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "not authorized user",
      });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "invalid token",
    });
  }
};