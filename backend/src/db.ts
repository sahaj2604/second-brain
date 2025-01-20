import mongoose, { mongo } from "mongoose";

export async function dbConnect() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MongoDB URI not found in environment variables.");
    }
    mongoose.connect(mongoURI).then(() => {
      console.log("connect to db");
    });
  } catch (error) {
    console.log(error);
  }
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique:true },
});

const contentTypes = ["twitter", "youtube"];
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

export const User=mongoose.model("User",userSchema);
export const Content=mongoose.model("Content",contentSchema);
export const Tag=mongoose.model("Tag",tagSchema);
export const Link=mongoose.model("Link",linkSchema);
