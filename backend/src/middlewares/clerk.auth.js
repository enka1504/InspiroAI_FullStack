import { verifyToken } from "@clerk/backend";
import 'dotenv/config';

const clerkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const { payload } = await verifyToken(token ,{
      jwtKey: process.env.CLERK_SIGNING_KEY,
    });

    req.auth = {
      userId: payload.sub,
      sessionId: payload.sid,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default clerkAuth;
