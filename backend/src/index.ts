import express, { Request, Response } from "express"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promise, z } from "zod";
import bcrypt from 'bcrypt'
import { Content, dbConnect, Link, User } from "./db.js";
import { auth } from "./middleware.js";
import cookieParser from 'cookie-parser'
import { random } from "./utils.js";
import cors from     'cors'

dotenv.config();
const app=express();
const PORT=process.env.PORT

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend origin
    credentials: true  // Allow cookies to be included
}))

app.post("/api/v1/signup",async (req: Request, res: Response): Promise<any>=>{
    try {
        const reqSchema=z.object({
            username: z.string().min(3).max(30),
            password: z.string().min(3).max(30).regex(/[A-Z]/).regex(/[!@#$%^&*(){}|:;"',.<>?]/)
        })
        const {success,error,data}=reqSchema.safeParse(req.body);
        if(!success){
            return res.json({error});
        }
        const hashedPassword=await bcrypt.hash(data.password,10);
        const user= await User.create({
            username:data.username,password:hashedPassword
        })
        return res.json({message:"User signed up",success:true})
    } catch (error) {
        return res.status(411).json({message:"already exist",success:false})
    }
})

app.post("/api/v1/signin",async (req: Request, res: Response): Promise<any>=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.json({message:"require all credentials"});
    }
    const user=await User.findOne({username})
    if(!user){
        return res.json({message:"invalid credentials",success:false});
    }
    const passCompare=await bcrypt.compare(password,user.password);
    if(!passCompare){
        return res.json({message:"invalid credentials",success:false});
    }
    const tokenData={userId:user._id}
    const secret = process.env.JWT_SECRET || 'default_secret';

    const token=jwt.sign(tokenData,secret)
    res.cookie("token",token);
    return res.json({token,success:true})
})

app.post("/api/v1/content",auth,async (req: Request, res: Response): Promise<any>=>{
    try {
        const {link,type,title}=req.body;
        const content=await Content.create({
            link,
            title,type,
            //@ts-ignore
            userId:req.id
        })
    
        return res.json({message:'content added',content});
        
    } catch (error) {
        return res.send(error)
    }
})
app.get("/api/v1/content",auth,async (req: Request, res: Response): Promise<any>=>{
    //@ts-ignore
    const contents=await Content.find({userId:req.id})
    .populate("userId",'username')
    return res.json({contents});
})
app.delete("/api/v1/content",auth,async (req: Request, res: Response): Promise<any>=>{
    const {contentId}=req.body
    const deleteContent=await Content.deleteMany({
        _id:contentId,
        //@ts-ignore
        userId:req.id
    });
    if(!deleteContent){
        return res.status(403).json({message:"not deleted"})
    }
    return res.status(200).json({message:"deleted"});
})

app.post("/api/v1/brain/share",auth,async (req:Request,res:Response): Promise<any>=>{
    const {share}=req.body;
    if(!share){
        //@ts-ignore
        await Link.deleteOne({userId:req.id})
        return res.json({message:"deleted link"})
    }
    //@ts-ignore
    const existingLink=await Link.findOne({userId:req.id})
    if(existingLink){
        return res.json({hash:existingLink.hash})
    }
    const link=await Link.create({
        hash:random(10),
        //@ts-ignore
        userId: req.id
    
    })
    return res.json({message:"Updated sharable link",link})
})
app.get("/api/v1/brain/:shareLink",async (req: Request, res: Response): Promise<any>=>{
    const {shareLink}=req.params;
    const link=await Link.findOne({hash:shareLink}).populate("userId","username")
    const user=await User.findById(link?.userId)
    const content=await Content.find({userId:user?._id})
    return res.json({username:user?.username,content})
})


app.listen(PORT,()=>{
    console.log('listening at port',PORT);
    dbConnect();
})