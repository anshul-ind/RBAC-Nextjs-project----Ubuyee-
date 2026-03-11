import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

// Manually load .env.local to simulate Next.js behavior
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const secret = process.env.JWT_SECRET;
console.log("JWT_SECRET found:", secret ? "YES (length: " + secret.length + ")" : "NO");

try {
  const token = jwt.sign({ sub: "test", role: "user" }, secret || "fallback", { expiresIn: "1h" });
  console.log("Token signed successfully:", token.substring(0, 10) + "...");
  
  const decoded = jwt.verify(token, secret || "fallback");
  console.log("Token verified successfully:", decoded);
} catch (err) {
  console.error("JWT Test Failed:", err);
}
