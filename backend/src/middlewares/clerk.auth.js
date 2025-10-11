import { verifyToken } from "@clerk/backend";

const clerkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    // ✅ This is correct
    const payload = await verifyToken(token);

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
