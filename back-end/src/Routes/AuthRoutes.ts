import { Router } from "express";
import jwt, { type Secret, type SignOptions, type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET as Secret;


if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Handle login logic here

    const user = { id: "1", email: "ab2arabi22@gmail.com", name: "Test User", password: "password" };
    if (email !== user.email || password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { ...user, token } });
});

router.post("/signup", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    // Handle signup logic here

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = { id: "1", email, name };
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: "User created", user: { ...user, token } });
});

// Add this new endpoint
router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        interface MyJwtPayload extends JwtPayload {
            email: string;
        }
        
        const decoded = jwt.verify(token as string, JWT_SECRET) as MyJwtPayload;
        // In a real app, you would look up the user in your database
        // For now, we'll return hardcoded data
        const user = { id: "1", email: decoded.email, name: "Test User", token };
        res.json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

export default router;
