var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { Content, dbConnect, User } from "./db.js";
import { auth } from "./middleware.js";
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
//middleware
app.use(express.json());
app.use(cookieParser());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqSchema = z.object({
            username: z.string().min(3).max(30),
            password: z.string().min(3).max(30).regex(/[A-Z]/).regex(/[!@#$%^&*(){}|:;"',.<>?]/)
        });
        const { success, error, data } = reqSchema.safeParse(req.body);
        if (!success) {
            return res.json({ error });
        }
        const hashedPassword = yield bcrypt.hash(data.password, 10);
        const user = yield User.create({
            username: data.username, password: hashedPassword
        });
        return res.json({ message: "User signed up" });
    }
    catch (error) {
        return res.status(411).json({ message: "already exist" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ message: "require all credentials" });
    }
    const user = yield User.findOne({ username });
    if (!user) {
        return res.json({ message: "invalid credentials" });
    }
    const passCompare = yield bcrypt.compare(password, user.password);
    if (!passCompare) {
        return res.json({ message: "invalid credentials" });
    }
    const tokenData = { userId: user._id };
    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign(tokenData, secret);
    res.cookie("token", token);
    return res.json({ token });
}));
app.post("/api/v1/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    const content = yield Content.create({
        link,
        title, type,
        //@ts-ignore
        userId: req.id
    });
    return res.json({ message: 'content added', content });
}));
app.get("/api/v1/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const contents = yield Content.find({ userId: req.id })
        .populate("userId", 'username');
    return res.json({ contents });
}));
app.delete("/api/v1/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    const deleteContent = yield Content.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.id
    });
    if (!deleteContent) {
        return res.status(403).json({ message: "not deleted" });
    }
    return res.status(200).json({ message: "deleted" });
}));
app.post("/api/v1/brain/share", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink } = req.params;
    const contents = yield Content.find({ link: shareLink });
    if (!contents) {
        return res.status(404).json({ message: "share link is invalid or sharing is disabled" });
    }
    return res.status(200).json({ contents });
}));
app.listen(PORT, () => {
    console.log('listening at port', PORT);
    dbConnect();
});
