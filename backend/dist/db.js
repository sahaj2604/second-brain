var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
export function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoURI = process.env.MONGO_URI;
            if (!mongoURI) {
                throw new Error("MongoDB URI not found in environment variables.");
            }
            mongoose.connect(mongoURI).then(() => {
                console.log("connect to db");
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true,
    },
    title: {
        type: String,
        requied: true,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});
export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Link = mongoose.model("Link", linkSchema);
